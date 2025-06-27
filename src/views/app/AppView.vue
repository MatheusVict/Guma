<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue'
import {
  BookOpen,
  GraduationCap,
  ChevronRight,
  HelpCircle,
  Menu,
  Settings,
  Home,
  CheckCircle,
  Upload,
  X,
  Plus
} from 'lucide-vue-next'
import SelectInput from '../../components/SelectInput.vue'
import ButtonPrimary from '../../components/buttons/ButtonPrimary.vue'
import {useRouter} from 'vue-router'
import {extractTextFromPDF, isPDFFile} from '../../utils/pdfExtractor.js'
import {CanvasRequest} from '../../services/api/routes/canvas'
import {getCanvasToken} from '../../utils/get-from-localstorage'

interface SelectOption {
  value: string | number
  label: string
}

interface ApiSelectOption {
  id: string
  name: string
}

interface FileUpload {
  id: string
  file: File | null
  name: string
  extractedText?: string
  isExtracting?: boolean
  extractionError?: string
  extractionProgress?: number
  abortController?: AbortController
}

interface StepData {
  step: number
  firstSelect: {
    value: string | number | null
    label: string
    options: SelectOption[]
  }
  secondSelect: {
    value: string | number | null
    label: string
    options: SelectOption[]
  }
  thirdSelect?: {
    value: string | number | null
    label: string
    options: SelectOption[]
  }
  files?: FileUpload[]
}

interface APIResponse {
  rubric: Rubric[]
}
interface Rubric {
  id: string
  points: number
  description: string
  ratings: Rating[]
  criterion_use_range: boolean
}

export interface Rating {
  id: string
  points: number
  description: string
  long_description: string
}

async function getAllDisciplinesEnrolled(accessToken: string): Promise<ApiSelectOption[]> {
  return await CanvasRequest.getAllDisciplinesEnrolled(accessToken);
}

async function getAssignmentsByCourseId(courseId: string, accessToken: string): Promise<ApiSelectOption[]> {
  return await CanvasRequest.getAssignmentsByCourseId(courseId, accessToken);
}

async function getAllRubricsFromAssignment(courseId: string, assignmentId: string, accessToken: string): Promise<APIResponse> {
  console.log('rubrics called')
  return await CanvasRequest.getAssignmentById(courseId, assignmentId, accessToken);
}

const getToken = getCanvasToken();

const disciplines = ref<SelectOption[]>([])

const isLoadingDisciplines = ref<boolean>(false)
const loadDisciplines = async () => {
  try {
    isLoadingDisciplines.value = true
    const response = await getAllDisciplinesEnrolled(getToken)

    disciplines.value = response.map(discipline => ({
      value: discipline.id,
      label: discipline.name
    }))

    console.log('Disciplines loaded:', disciplines.value)
  } catch (error) {
    console.error('Failed to load disciplines:', error)
    disciplines.value = [
      {value: 'math', label: 'Mathematics'},
      {value: 'physics', label: 'Physics'},
      {value: 'chemistry', label: 'Chemistry'},
      {value: 'biology', label: 'Biology'},
      {value: 'computer-science', label: 'Computer Science'}
    ]
  } finally {
    isLoadingDisciplines.value = false
  }
}


const assignments = ref<SelectOption[]>([])
const isLoadingAssignments = ref<boolean>(false)

const rubrics = ref<SelectOption[]>([])
const isLoadingRubrics = ref<boolean>(false)

const currentStep = ref<number>(1)
const completedSteps = ref<StepData[]>([])

const firstSelectValue = ref<string | number | null>(null)
const secondSelectValue = ref<string | number | null>(null)
const thirdSelectValue = ref<string | number | null>(null)

const loadAssignments = async (disciplineId: string) => {
  try {
    isLoadingAssignments.value = true
    const response = await getAssignmentsByCourseId(disciplineId, getToken)

    assignments.value = response.map(assignment => ({
      value: assignment.id,
      label: assignment.name
    }))

    console.log('Assignments loaded:', assignments.value)
  } catch (error) {
    console.error('Failed to load assignments:', error)
    assignments.value = [
      {value: 'assignment-1', label: 'Assignment 1: Basic Concepts'},
      {value: 'assignment-2', label: 'Assignment 2: Advanced Topics'},
      {value: 'assignment-3', label: 'Assignment 3: Research Project'},
      {value: 'assignment-4', label: 'Assignment 4: Case Study'},
      {value: 'assignment-5', label: 'Assignment 5: Final Project'}
    ]
  } finally {
    isLoadingAssignments.value = false
  }
}

const loadRubrics = async (courseId: string, assignmentId: string) => {
  try {
    isLoadingRubrics.value = true
    const response = await getAllRubricsFromAssignment(courseId, assignmentId, getToken)

    rubrics.value = response.rubric.map(rubric => ({
      value: assignmentId, // Use assignment ID as value as requested
      label: rubric.description
    }))

    console.log('Rubrics loaded:', rubrics.value)
  } catch (error) {
    console.error('Failed to load rubrics:', error)
    rubrics.value = [
      {value: assignmentId, label: 'Basic Evaluation Rubric'},
      {value: assignmentId, label: 'Detailed Assessment Rubric'},
      {value: assignmentId, label: 'Research Project Rubric'},
      {value: assignmentId, label: 'Presentation Rubric'},
      {value: assignmentId, label: 'Comprehensive Evaluation Rubric'}
    ]
  } finally {
    isLoadingRubrics.value = false
  }
}

// Watch for discipline selection to load assignments
watch(firstSelectValue, (newValue) => {
  if (newValue && currentStep.value === 1) {
    loadAssignments(newValue as string)
  }
  // Reset second and third select when first select changes
  secondSelectValue.value = null
  thirdSelectValue.value = null

  // In step 2, firstSelectValue is the assignment, so load rubrics when it changes
  if (newValue && currentStep.value === 2) {
    // Get the discipline ID from the completed step 1
    const disciplineId = completedSteps.value.find(step => step.step === 1)?.firstSelect.value as string
    if (disciplineId) {
      loadRubrics(disciplineId, newValue as string)
    }
  }
})

// Watch for assignment selection to load rubrics
watch(secondSelectValue, (newValue) => {
  // This watcher is no longer needed for loading rubrics since it's handled in firstSelectValue watcher
  // Reset third select when second select changes
  thirdSelectValue.value = null
})

const fileUploads = ref<FileUpload[]>([
  {id: '1', file: null, name: '', extractedText: '', isExtracting: false, extractionError: '', extractionProgress: 0}
])

const showAIResponse = ref<boolean>(false)
const aiResponse = ref<string>('')
const isLoadingAI = ref<boolean>(false)
const currentStepConfig = computed(() => {
  switch (currentStep.value) {
    case 1:
      return {
        title: 'Select Discipline',
        description: 'Choose your academic discipline to get started.',
        firstSelect: {
          label: 'Disciplina',
          options: disciplines.value,
          placeholder: isLoadingDisciplines.value ? 'Loading disciplines...' : 'Choose a discipline...',
          icon: BookOpen
        },
        secondSelect: {
          label: '',
          options: [],
          placeholder: '',
          icon: GraduationCap
        }
      }
    case 2:
      return {
        title: 'Select Assignment and Rubric',
        description: 'Pick the assignment type and evaluation rubric for your course.',
        firstSelect: {
          label: 'Assignment',
          options: assignments.value,
          placeholder: isLoadingAssignments.value ? 'Loading assignments...' : 'Choose an assignment...',
          icon: BookOpen
        },
        secondSelect: {
          label: 'Rubric',
          options: rubrics.value,
          placeholder: isLoadingRubrics.value ? 'Loading rubrics...' : 'Choose a rubric...',
          icon: GraduationCap
        }
      }
    case 3:
      return {
        title: 'Upload PDF Files',
        description: 'Upload your PDF documents to extract text and complete the setup.',
        firstSelect: {
          label: '',
          options: [],
          placeholder: '',
          icon: Upload
        },
        secondSelect: {
          label: '',
          options: [],
          placeholder: '',
          icon: Upload
        }
      }
    default:
      return {
        title: 'Completed!',
        description: 'Your setup is complete and ready to use.',
        firstSelect: {label: '', options: [], placeholder: '', icon: BookOpen},
        secondSelect: {label: '', options: [], placeholder: '', icon: GraduationCap}
      }
  }
})

const canProceed = computed(() => {
  if (currentStep.value === 3) {
    return fileUploads.value.some(upload =>
      upload.file !== null &&
      upload.extractedText &&
      upload.extractedText.length > 0 &&
      !upload.isExtracting &&
      !upload.extractionError
    )
  }
  if (currentStep.value === 1) {
    return firstSelectValue.value !== null
  }
  if (currentStep.value === 2) {
    return firstSelectValue.value !== null && secondSelectValue.value !== null
  }
  return firstSelectValue.value !== null && secondSelectValue.value !== null
})

const isCompleted = computed(() => {
  return currentStep.value > 3
})


onMounted(() => {
  loadDisciplines()
})

const handleNext = async () => {
  if (!canProceed.value) return

  const stepData: StepData = {
    step: currentStep.value,
    firstSelect: {
      value: firstSelectValue.value!,
      label: getOptionLabel(currentStepConfig.value.firstSelect.options, firstSelectValue.value!),
      options: currentStepConfig.value.firstSelect.options
    },
    secondSelect: {
      value: currentStep.value === 1 ? 'n/a' : secondSelectValue.value!,
      label: currentStep.value === 1 ? 'N/A' : getOptionLabel(currentStepConfig.value.secondSelect.options, secondSelectValue.value!),
      options: currentStepConfig.value.secondSelect.options
    }
  }
  console.log(firstSelectValue.value)

  if (currentStep.value === 3) {
    stepData.files = [...fileUploads.value.filter(upload => upload.file !== null)]
    stepData.firstSelect = {value: 'files', label: 'Files Uploaded', options: []}
    stepData.secondSelect = {value: 'files', label: `${stepData.files.length} file(s)`, options: []}
  }

  completedSteps.value.push(stepData)

  if (currentStep.value === 3) {
    await makeCompletionAPICall()
  }

  currentStep.value++

  firstSelectValue.value = null
  secondSelectValue.value = null
  thirdSelectValue.value = null

  if (currentStep.value > 3) {
    fileUploads.value = [{id: '1', file: null, name: '', extractedText: '', isExtracting: false, extractionError: ''}]
  }
}

const getOptionLabel = (options: SelectOption[], value: string | number): string => {
  const option = options.find(opt => opt.value === value)
  return option ? option.label : String(value)
}

const resetProcess = () => {
  fileUploads.value.forEach(upload => {
    if (upload.abortController) {
      upload.abortController.abort()
    }
  })

  currentStep.value = 1
  completedSteps.value = []
  firstSelectValue.value = null
  secondSelectValue.value = null
  thirdSelectValue.value = null
  fileUploads.value = [{
    id: '1',
    file: null,
    name: '',
    extractedText: '',
    isExtracting: false,
    extractionError: '',
    extractionProgress: 0
  }]
}

const handleFileChange = async (uploadId: string, event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] || null

  const uploadIndex = fileUploads.value.findIndex(upload => upload.id === uploadId)
  if (uploadIndex !== -1) {
    if (fileUploads.value[uploadIndex].abortController) {
      fileUploads.value[uploadIndex].abortController.abort();
    }

    fileUploads.value[uploadIndex].file = file
    fileUploads.value[uploadIndex].name = file?.name || ''
    fileUploads.value[uploadIndex].extractedText = ''
    fileUploads.value[uploadIndex].isExtracting = false
    fileUploads.value[uploadIndex].extractionError = ''
    fileUploads.value[uploadIndex].extractionProgress = 0

    if (file && isPDFFile(file)) {
      fileUploads.value[uploadIndex].isExtracting = true

      const abortController = new AbortController();
      fileUploads.value[uploadIndex].abortController = abortController;

      try {
        const extractedText = await extractTextFromPDF(
          file,
          (progress) => {
            fileUploads.value[uploadIndex].extractionProgress = progress;
          },
          abortController
        );

        fileUploads.value[uploadIndex].extractedText = extractedText;
        fileUploads.value[uploadIndex].isExtracting = false;

        console.log(`Extracted text from ${file.name}:`, extractedText.substring(0, 200) + '...');
      } catch (error) {
        fileUploads.value[uploadIndex].isExtracting = false;
        fileUploads.value[uploadIndex].extractionError = error.message || 'Failed to extract text from PDF';
        console.error('PDF text extraction failed:', error);
      } finally {
        fileUploads.value[uploadIndex].abortController = undefined;
      }
    }

    if (uploadIndex === fileUploads.value.length - 1 && file) {
      addFileUpload();
    }
  }
}

const addFileUpload = () => {
  const newId = (fileUploads.value.length + 1).toString()
  fileUploads.value.push({
    id: newId,
    file: null,
    name: '',
    extractedText: '',
    isExtracting: false,
    extractionError: '',
    extractionProgress: 0
  })
}

const removeFileUpload = (uploadId: string) => {
  if (fileUploads.value.length > 1) {
    cancelExtraction(uploadId);
    fileUploads.value = fileUploads.value.filter(upload => upload.id !== uploadId)
  }
}

const cancelExtraction = (uploadId: string) => {
  const uploadIndex = fileUploads.value.findIndex(upload => upload.id === uploadId)
  if (uploadIndex !== -1 && fileUploads.value[uploadIndex].abortController) {
    fileUploads.value[uploadIndex].abortController.abort()

    fileUploads.value[uploadIndex].isExtracting = false
    fileUploads.value[uploadIndex].extractionError = 'Extraction cancelled by user'

    console.log(`Cancelled extraction for file: ${fileUploads.value[uploadIndex].name}`)
  }
}

const toggleAIResponse = async () => {
  console.log('form', getCurrentFormData())
  if (!isCompleted.value) return

  showAIResponse.value = !showAIResponse.value
  if (showAIResponse.value) {
    if (!aiResponse.value) {
      await generateAIResponse()
    }
    await scrollToAIResponse()
  }
}

const generateAIResponse = async () => {
  console.log('ai response')
  isLoadingAI.value = true
  aiResponse.value = ''

  await new Promise(resolve => setTimeout(resolve, 2000))

  const currentData = getCurrentFormData()
  console.log('currentData', currentData)
  aiResponse.value = generateFakeAIResponse(currentData)

  isLoadingAI.value = false
}

const getCurrentFormData = () => {
  return {
    currentStep: currentStep.value,
    completedSteps: completedSteps.value,
    currentSelections: {
      first: firstSelectValue.value,
      second: secondSelectValue.value
    },
    files: fileUploads.value.filter(upload => upload.file !== null)
  }
}

const generateFakeAIResponse = (data: any) => {
  const responses = [
    `Based on your selections, I can see you're working with ${data.completedSteps.length > 0 ? data.completedSteps[0]?.firstSelect?.label || 'your chosen discipline' : 'your academic setup'}. This is an excellent choice for developing comprehensive educational materials.

Here are some suggestions for your next steps:
• Consider creating interactive exercises that align with your chosen teaching style
• Develop assessment rubrics that match your academic standards
• Create multimedia content to enhance student engagement`,

    `I notice you're currently on step ${data.currentStep}. The configuration you've chosen so far shows a well-structured approach to academic content creation.

Recommendations:
• Your discipline selection provides a solid foundation for targeted content
• The professor style you've chosen will help personalize the learning experience
• Consider adding supplementary materials to enhance comprehension`,

    `Your uploaded files ${data.files.length > 0 ? `(${data.files.length} file${data.files.length > 1 ? 's' : ''})` : ''} will be processed to create personalized educational content that matches your teaching style and academic requirements.

Next steps:
• I'll analyze your content to identify key learning objectives
• Create customized exercises based on your materials
• Generate assessment tools aligned with your rubric preferences`,
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}

const makeCompletionAPICall = async () => {
  isLoadingAI.value = true
  showAIResponse.value = true

  const allData = {
    completedSteps: completedSteps.value,
    totalSteps: 3,
    timestamp: new Date().toISOString()
  }

  console.log('Making API call with data:', allData)

  await new Promise(resolve => setTimeout(resolve, 3000))
  aiResponse.value = `🎉 Excellent! Your Guma Agent setup is now complete and I've processed all your information.

Based on your configuration:
${completedSteps.value.map((step, index) =>
    `• Step ${step.step}: ${step.firstSelect.label} → ${step.secondSelect.label}`
  ).join('\n')}

I'm now ready to help you create amazing educational content! Here's what I can do for you:

📚 **Content Generation**: Create lesson plans, exercises, and study materials tailored to your discipline and teaching style.

📝 **Assessment Tools**: Generate quizzes, assignments, and rubrics that align with your academic standards.

🎯 **Personalized Learning**: Adapt content difficulty and presentation style based on your professor preferences.

📊 **Progress Tracking**: Monitor student engagement and learning outcomes with detailed analytics.

Your educational content creation journey starts now! I'll use all the information you've provided to deliver the most relevant and effective materials for your students.`

  isLoadingAI.value = false

  await scrollToAIResponse()
}

const scrollToAIResponse = async () => {
  await new Promise(resolve => setTimeout(resolve, 100))

  const aiResponseElement = document.querySelector('.ai-response-area')
  if (aiResponseElement) {
    aiResponseElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const router = useRouter();
const goToHome = () => {
  router.push('/')
}


</script>

<template>
  <div class="guma-agent">
    <div class="background-pattern"></div>
    <div class="sidebar">
      <div class="sidebar-icons">
        <button class="sidebar-btn" :class="{ active: currentStep === 1 }">
          <Settings class="icon"/>
        </button>
        <button class="sidebar-btn" :class="{ active: showAIResponse, disabled: !isCompleted }"
                @click="toggleAIResponse">
          <Menu class="icon"/>
        </button>
        <button class="sidebar-btn" @click="goToHome">
          <Home class="icon"/>
        </button>
      </div>
    </div>

    <div class="main-content">
      <header class="header">
        <div class="logo-section">
          <div class="mascot">
            <img src="../../assets/img/guma.svg" alt="Guma Agent Mascot" class="mascot-image"/>
          </div>
          <h1 class="title">Guma Agent</h1>
        </div>
        <button class="help-btn">
          <HelpCircle class="icon"/>
        </button>
      </header>

      <div class="progress-indicator">
        <div
          v-for="step in 3"
          :key="step"
          class="progress-step"
          :class="{
            'active': step === currentStep,
            'completed': step < currentStep
          }"
        >
          <CheckCircle v-if="step < currentStep" class="icon"/>
          <span v-else>{{ step }}</span>
        </div>
      </div>

      <div class="content-section">
        <div v-if="!isCompleted" class="step-container">
          <h2 class="step-title">{{ currentStepConfig.title }}</h2>
          <p class="description">
            {{ currentStepConfig.description }}
          </p>

          <div v-if="currentStep !== 3" class="cards-container">
            <div class="card" :class="{ 'selected': firstSelectValue }">
              <div class="card-icon">
                <component :is="currentStepConfig.firstSelect.icon" class="icon"/>
              </div>
              <div class="card-content">
                <div class="card-header">
                  <span class="card-label">{{ currentStepConfig.firstSelect.label }}</span>
                  <ChevronRight class="arrow-icon"/>
                </div>
                <div class="select-container">
                  <SelectInput
                    v-model="firstSelectValue"
                    :options="currentStepConfig.firstSelect.options"
                    :placeholder="currentStepConfig.firstSelect.placeholder"
                  />
                </div>
              </div>
            </div>

            <div v-if="currentStep !== 1" class="card"
                 :class="{ 'selected': secondSelectValue, 'disabled': !firstSelectValue }">
              <div class="card-icon">
                <component :is="currentStepConfig.secondSelect.icon" class="icon"/>
              </div>
              <div class="card-content">
                <div class="card-header">
                  <span class="card-label">{{ currentStepConfig.secondSelect.label }}</span>
                  <ChevronRight class="arrow-icon"/>
                </div>
                <div class="select-container">
                  <SelectInput
                    v-model="secondSelectValue"
                    :options="currentStepConfig.secondSelect.options"
                    :placeholder="currentStepConfig.secondSelect.placeholder"
                    :disabled="!firstSelectValue"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-else class="file-upload-container">
            <div
              v-for="upload in fileUploads"
              :key="upload.id"
              class="file-upload-card"
              :class="{ 'has-file': upload.file }"
            >
              <div class="file-card-icon">
                <Upload class="icon"/>
              </div>
              <div class="file-card-content">
                <div class="file-card-header">
                  <span class="file-card-label">
                    {{ upload.file ? upload.name : 'Choose PDF file...' }}
                  </span>
                  <button
                    v-if="fileUploads.length > 1 && !upload.file"
                    @click="removeFileUpload(upload.id)"
                    class="remove-btn"
                    type="button"
                  >
                    <X class="icon"/>
                  </button>
                </div>

                <div v-if="upload.file" class="extraction-status">
                  <div v-if="upload.isExtracting" class="extraction-loading">
                    <div class="loading-spinner"></div>
                    <div class="extraction-progress">
                      <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: `${upload.extractionProgress}%` }"></div>
                      </div>
                      <span>Extracting text from PDF... {{ upload.extractionProgress }}%</span>
                      <button
                        @click="cancelExtraction(upload.id)"
                        class="cancel-btn"
                        type="button"
                      >
                        <X class="icon"/>
                        Cancel
                      </button>
                    </div>
                  </div>
                  <div v-else-if="upload.extractionError" class="extraction-error">
                    <span>❌ {{ upload.extractionError }}</span>
                  </div>
                  <div v-else-if="upload.extractedText" class="extraction-success">
                    <span>✅ Text extracted successfully ({{ upload.extractedText.length }} characters)</span>
                    <details class="extracted-text-preview">
                      <summary>Preview extracted text</summary>
                      <div class="text-preview">
                        {{ upload.extractedText.substring(0, 500) }}{{ upload.extractedText.length > 500 ? '...' : '' }}
                      </div>
                    </details>
                  </div>
                </div>
                <div class="file-input-container">
                  <input
                    type="file"
                    :id="`file-${upload.id}`"
                    @change="handleFileChange(upload.id, $event)"
                    class="file-input"
                    accept=".pdf"
                  />
                  <label
                    :for="`file-${upload.id}`"
                    class="file-input-label"
                  >
                    <Upload class="icon"/>
                    {{ upload.file ? 'Change PDF' : 'Select PDF file' }}
                  </label>
                </div>
              </div>
            </div>

            <button
              @click="addFileUpload"
              class="add-file-btn"
              type="button"
            >
              <Plus class="icon"/>
              Add another PDF
            </button>
          </div>

          <div class="button-container">
            <ButtonPrimary
              :text="currentStep === 3 ? 'Complete' : 'Next'"
              @click="handleNext"
              :class="{ 'disabled': !canProceed }"
            />
          </div>
        </div>

        <div v-else class="completion-container">
          <div class="completion-icon">
            <CheckCircle class="icon"/>
          </div>
          <h2 class="completion-title">Setup Complete!</h2>
          <p class="completion-description">
            Your Guma Agent configuration has been successfully completed.
          </p>

          <div class="summary">
            <div v-for="step in completedSteps" :key="step.step" class="summary-step">
              <h3>Step {{ step.step }}</h3>
              <div class="summary-content">
                <div v-if="step.files && step.files.length > 0">
                  <p><strong>Files Uploaded:</strong></p>
                  <ul class="file-list">
                    <li v-for="file in step.files" :key="file.id">
                      {{ file.name }}
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p><strong>{{ step.firstSelect.label }}</strong></p>
                  <p><strong>{{ step.secondSelect.label }}</strong></p>
                </div>
              </div>
            </div>
          </div>

          <div class="button-container">
            <ButtonPrimary
              text="Start Over"
              @click="resetProcess"
            />
          </div>
        </div>

        <div v-if="completedSteps.length > 0 && !isCompleted" class="previous-selections">
          <h3>Previous Selections:</h3>
          <div v-for="step in completedSteps" :key="step.step" class="previous-step">
            <span class="step-number">Step {{ step.step }}:</span>
            <span class="selection">{{ step.firstSelect.label }} → {{ step.secondSelect.label }}</span>
          </div>
        </div>

        <div v-if="showAIResponse && isCompleted" class="ai-response-area">
          <div class="ai-response-header">
            <div class="ai-avatar">
              <img src="../../assets/img/guma.svg" alt="Guma AI" class="ai-avatar-image"/>
            </div>
            <h3>Guma AI Response</h3>
          </div>

          <div class="ai-response-content">
            <div v-if="isLoadingAI" class="loading-state">
              <div class="loading-spinner"></div>
              <p>Guma is analyzing your data and generating response...</p>
            </div>

            <div v-else class="ai-text-area">
              <pre>{{ aiResponse || 'Click the menu button to get AI insights about your current setup!' }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/styles/pages/app/index";
</style>
