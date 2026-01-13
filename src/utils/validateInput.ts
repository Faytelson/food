export type ValidationRule =
  | { type: "required" }
  | { type: "minLength"; value: number }
  | { type: "maxLength"; value: number }
  | { type: "email" }
  | { type: "password" }
  | { type: "passwordRepeat"; value: string }
  | { type: "pattern"; value: RegExp };

export type ValidationResult = { valid: true } | { valid: false; error: string };

export function validateInput(value: string, rules: ValidationRule[]): ValidationResult {
  for (const rule of rules) {
    switch (rule.type) {
      case "required": {
        if (!value.trim()) {
          return { valid: false, error: "Поле обязательно" };
        }
        break;
      }

      case "minLength": {
        if (value.length < rule.value) {
          return {
            valid: false,
            error: `Минимальная длина — ${rule.value}`,
          };
        }
        break;
      }

      case "maxLength": {
        if (value.length > rule.value) {
          return {
            valid: false,
            error: `Максимальная длина — ${rule.value}`,
          };
        }
        break;
      }

      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return { valid: false, error: "Некорректный email" };
        }
        break;
      }

      case "password": {
        const hasLetter = /[a-zA-Zа-яА-ЯёЁ]/.test(value);
        const hasNumber = /\d/.test(value);

        if (!hasLetter || !hasNumber) {
          return {
            valid: false,
            error: "Пароль должен содержать буквы и цифры",
          };
        }
        break;
      }

      case "passwordRepeat": {
        if (value !== rule.value) {
          return {
            valid: false,
            error: "Пароли не совпадают",
          };
        }
        break;
      }

      case "pattern": {
        if (!rule.value.test(value)) {
          return { valid: false, error: "Неверный формат" };
        }
        break;
      }

      default:
        break;
    }
  }

  return { valid: true };
}
