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
@use '../assets/styles/variables/colors' as colors;
@use '../assets/styles/variables/base' as base;
@use '../assets/styles/variables/typography' as typography;
@use '../assets/styles/mixins/flex' as flex;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  @include flex.flex-center();
  z-index: 1000;
  padding: base.$padding-md;
}

.modal-content {
  background-color: colors.color("neutral", "gray-mauve");
  border-radius: base.$border-radius-lg;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header {
  @include flex.flex-row(space-between, center);
  padding: base.$padding-lg;
  border-bottom: 1px solid colors.color('neutral', 'gray-lighter');

  h2 {
    font-family: typography.$font-secondary;
    font-size: 1.5rem;
    font-weight: 700;
    color: colors.color('neutral', 'gray-darkest');
    margin: 0;
  }

  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: base.$padding-sm;
    border-radius: base.$border-radius-base;
    color: colors.color('neutral', 'gray-dark');
    transition: all 0.2s ease;

    &:hover {
      background-color: colors.color('neutral', 'gray-lightest');
      color: colors.color('neutral', 'gray-darkest');
    }
  }
}

.modal-body {
  padding: base.$padding-lg;
}

.instruction-section {
  margin-bottom: base.$margin-xl;

  h3 {
    font-family: typography.$font-secondary;
    font-size: 1.25rem;
    font-weight: 600;
    color: colors.color('neutral', 'gray-darkest');
    margin-bottom: base.$margin-md;
  }

  .instruction-list {
    list-style: none;
    counter-reset: step-counter;
    padding-left: 0;
    margin-bottom: base.$margin-lg;

    li {
      counter-increment: step-counter;
      margin-bottom: base.$margin-sm;
      padding-left: base.$padding-xl;
      position: relative;
      line-height: 1.5;
      color: colors.color('neutral', 'gray-dark');

      &::before {
        content: counter(step-counter);
        position: absolute;
        left: 0;
        top: 0;
        background: colors.color('orange', 'primary');
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        @include flex.flex-center();
        font-size: 0.875rem;
        font-weight: 600;
      }

      strong {
        color: colors.color('neutral', 'gray-darkest');
      }
    }
  }

  .warning-box {
    @include flex.flex-row(flex-start, flex-start, nowrap, base.$size-sm);
    background: colors.color('yellow', 'light-1');
    border: 1px solid colors.color('yellow', 'primary');
    border-radius: base.$border-radius-base;
    padding: base.$padding-md;

    svg {
      color: colors.color('yellow', 'dark-2');
      flex-shrink: 0;
      margin-top: 2px;
    }

    p {
      margin: 0;
      color: colors.color('yellow', 'dark-2');
      font-size: 0.875rem;
      line-height: 1.4;

      strong {
        font-weight: 600;
      }
    }
  }
}

.input-section {
  color: #000000;
  .input-label {
    display: block;
    font-weight: 600;
    color: colors.color('neutral', 'gray-darkest');
    margin-bottom: base.$margin-sm;
    font-size: 0.875rem;
  }

  .token-input {
    width: 100%;
    padding: base.$padding-md;
    border: 2px solid colors.color('neutral', 'gray-lighter');
    border-radius: base.$border-radius-base;
    font-size: 1rem;
    transition: border-color 0.2s ease;
    background: white;

    &:focus {
      outline: none;
      border-color: colors.color('orange', 'primary');
    }

    &.error {
      border-color: colors.color('red', 'primary');
    }

    &::placeholder {
      color: colors.color('neutral', 'gray-medium');
    }
  }

  .error-message {
    color: colors.color('red', 'primary');
    font-size: 0.875rem;
    margin-top: base.$margin-xs;
  }
}

.modal-footer {
  @include flex.flex-row(flex-end, center, nowrap, base.$size-md);
  padding: base.$padding-lg;
  border-top: 1px solid colors.color('neutral', 'gray-lighter');

  .cancel-button {
    background: none;
    border: 2px solid colors.color('neutral', 'gray-lighter');
    color: colors.color('neutral', 'gray-dark');
    padding: base.$padding-sm base.$padding-lg;
    border-radius: base.$border-radius-base;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: colors.color('neutral', 'gray-dark');
      color: colors.color('neutral', 'gray-darkest');
    }
  }
}

// Responsive design
@media (max-width: 640px) {
  .modal-overlay {
    padding: base.$padding-sm;
  }

  .modal-content {
    max-height: 95vh;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding: base.$padding-md;
  }

  .instruction-section {
    .instruction-list li {
      padding-left: base.$padding-lg;

      &::before {
        width: 20px;
        height: 20px;
        font-size: 0.75rem;
      }
    }
  }

  .modal-footer {
    @include flex.flex-column(stretch, stretch, nowrap, base.$size-sm);

    .cancel-button {
      order: 2;
    }

    :deep(.button-primary) {
      order: 1;
    }
  }
}
</style>
