import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    javascript: true,
    typescript: true,
    stylistic: true
  },
  {
    files: ['**/*.vue'],
    rules: {
      'no-console': 'off',
      'vue/component-tags-order': ['error', {
        order: ['template', 'script', 'style']
      }],
      'vue/operator-linebreak': ['error', 'before'],
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'antfu/top-level-function': 'off'
    }
  },
  {
    files: ['**/*.js'],
    rules: {
      'prefer-rest-params': 'off'
    }
  },
  {
    rules: {
      'style/semi': ['error', 'never'],
      'style/comma-dangle': ['error', 'never']
    }
  }
)
