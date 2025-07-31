export {};

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;

      login(username: string, password: string): Chainable<JQuery<HTMLElement>>;

      loginWithSession(userRole: string): Chainable<JQuery<HTMLElement>>;

      generateToken(): Chainable<JQuery<HTMLElement>>;

      verifyQuestionCardData(
        index: number,
        question_text: string,
        type?: string,
        category?: string,
        sub_category?: string,
      ): Chainable<JQuery<HTMLElement>>;

      createNewCompany(
        name: string,
        email: string,
        description: string,
        logo_path: string,
      ): Chainable<JQuery<HTMLElement>>;

      deleteCompany(index: number): Chainable<JQuery<HTMLElement>>;

      deleteUser(index: number): Chainable<JQuery<HTMLElement>>;

      verifyCompanyCardData(
        index: number,
        name: string,
        email: string,
        date: string,
      ): Chainable<JQuery<HTMLElement>>;

      verifyUserCardData(
        index: number,
        name: string,
        email: string,
        icon_class: string,
        role?: string,
      ): Chainable<JQuery<HTMLElement>>;

      verifyParticipantCardData(
        index: number,
        name: string,
        email: string,
      ): Chainable<JQuery<HTMLElement>>;

      addAdmin(
        email: string,
        first_name: string,
        last_name: string,
      ): Chainable<JQuery<HTMLElement>>;

      addParticipant(
        email: string,
        first_name: string,
        last_name: string,
        feedback_duration: string,
        select_admin?: string,
      ): Chainable<JQuery<HTMLElement>>;

      addRater(
        email: string,
        first_name: string,
        last_name: string,
        select_participant: string,
        rater_type: string,
      ): Chainable<JQuery<HTMLElement>>;

      sendInvitation(index: number): Chainable<JQuery<HTMLElement>>;

      verifyDeleteModalMessage(
        invited_user: string,
        invited_for: string,
        user_type: string,
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}
