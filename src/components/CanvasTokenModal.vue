<script setup>
import { ref, defineEmits } from 'vue'
import ButtonPrimary from './buttons/ButtonPrimary.vue'

const emit = defineEmits(['close', 'token-saved'])

const token = ref('')
const isLoading = ref(false)
const error = ref('')

const saveToken = () => {
  if (!token.value.trim()) {
    error.value = 'Por favor, insira um token válido'
    return
  }

  try {
    localStorage.setItem('canvastoken', token.value.trim())
    emit('token-saved')
    emit('close')
  } catch (err) {
    error.value = 'Erro ao salvar o token. Tente novamente.'
  }
}

const closeModal = () => {
  emit('close')
}

const clearError = () => {
  error.value = ''
}
</script>

<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Configure seu Token do Canvas</h2>
        <button class="close-button" @click="closeModal" aria-label="Fechar modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <div class="instruction-section">
          <h3>Como obter seu token do Canvas:</h3>
          <ol class="instruction-list">
            <li>Acesse sua conta do Canvas</li>
            <li>Vá em <strong>Configurações</strong> → <strong>Configurações da Conta</strong></li>
            <li>Role até a seção <strong>"Tokens de Acesso Aprovados"</strong></li>
            <li>Clique em <strong>"+ Novo Token de Acesso"</strong></li>
            <li>Dê um nome ao token (ex: "Guma Agent")</li>
            <li>Defina uma data de expiração (opcional)</li>
            <li>Clique em <strong>"Gerar Token"</strong></li>
            <li>Copie o token gerado e cole no campo abaixo</li>
          </ol>

          <div class="warning-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p><strong>Importante:</strong> Mantenha seu token seguro e não o compartilhe com terceiros.</p>
          </div>
        </div>

        <div class="input-section">
          <label for="canvas-token" class="input-label">Cole seu token do Canvas:</label>
          <input
            id="canvas-token"
            v-model="token"
            type="password"
            class="token-input"
            placeholder="Insira seu token aqui..."
            @input="clearError"
            :class="{ 'error': error }"
          />
          <div v-if="error" class="error-message">{{ error }}</div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="cancel-button" @click="closeModal">Cancelar</button>
        <ButtonPrimary
          text="Salvar Token"
          @click="saveToken"
          :disabled="isLoading"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/components/modal/index";
</style>
