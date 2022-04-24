export class CustomValidationMessages {
  private static _validationMessages = {
    firstName: {
      required: 'First name is required',
      minlength: 'First name must be greater than 4 characters',
      maxLength: 'First name must be less than 20 characters',
      startSpace: 'First name can not start with space'
    },
    lastName: {
      required: 'Last name is required',
      minlength: 'Last name must be greater than 4 characters',
      maxLength: 'Last name must be less than 20 characters',
      startSpace: 'Last name can not start with space'
    },
    email: {
      required: "Email is required",
      invalid: "Email is invalid",
      startSpace: "Email can not start with space",
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be greater than or equal to 6 characters',
      maxLength: 'Password must be less than 20 characters',
      startSpace: 'Password can not start with space'
    },
    author: {
      required: 'Author is required',
      minlength: 'Author must be greater than or equal to 6 characters',
      maxLength: 'Author must be less than 20 characters',
      startSpace: 'Author can not start with space'
    },
    content: {
      required: 'Content is required',
      minlength: 'Content must be greater than or equal to 6 characters',
      maxLength: 'Content must be less than 20 characters',
      startSpace: 'Content can not start with space'
    },
    title: {
      required: 'Title is required',
      minlength: 'Title must be greater than or equal to 6 characters',
      maxLength: 'Title must be less than 20 characters',
      startSpace: 'Title can not start with space'
    },
    description: {
      required: 'Description is required',
      minlength: 'Description must be greater than or equal to 6 characters',
      maxLength: 'Description must be less than 20 characters',
      startSpace: 'Description can not start with space'
    },
    url: {
      required: 'URL is required',
      minlength: 'URL must be greater than or equal to 6 characters',
      maxLength: 'URL must be less than 20 characters',
      startSpace: 'URL can not start with space'
    },
    urlToImage: {
      required: 'Image URL is required',
      minlength: 'Image URL must be greater than or equal to 6 characters',
      maxLength: 'Image URL must be less than 20 characters',
      startSpace: 'Image URL can not start with space'
    },
    source: {
      required: 'Source is required',
      minlength: 'Source must be greater than or equal to 6 characters',
      maxLength: 'Source must be less than 20 characters',
      startSpace: 'Source can not start with space'
    }
  };

  static get validationMessages() {
    return this._validationMessages;
  }
}
