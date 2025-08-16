export interface RequirementStatus {
  cv: 'Submitted' | 'Empty';
  motivationLetter: 'Submitted' | 'Empty';
  instagramStory: 'Submitted' | 'Empty';
  twibbon: 'Submitted' | 'Empty';
  divisionAssignment: 'Submitted' | 'Empty';
}

export interface UserDashboard {
  email: string;
  documentStatus: string;
  requirements: RequirementStatus;
} 