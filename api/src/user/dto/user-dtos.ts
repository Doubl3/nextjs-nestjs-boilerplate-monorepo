/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

enum UserRole {
  CANDIDATE = 'candidate',
  COMPANY = 'company',
  ADMINISTRATOR = 'admin'
}

export class UserDTO {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email: string;
  language: string;
  role: UserRole;
  age?: number;

  setUser = (userDAO: any): void => {
    this.id = userDAO.id;
    this.firstName = userDAO.firstName;
    this.middleName = userDAO.middleName;
    this.lastName = userDAO.lastName;
    this.email = userDAO.email;
    this.language = userDAO.language;
    this.role = userDAO.role;

    // Computed age attribute
    if (userDAO.birthDate) {
      const currentYear: number = new Date().getFullYear();
      const birthYear: number = userDAO.birthDate.getFullYear();
      const age: number = currentYear - birthYear;
      this.age = age;
    }
  }
}
