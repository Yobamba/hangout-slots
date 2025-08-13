// Shared TypeScript interfaces
export interface Event {
  id: string;
  name: string;
  date: string;
}

export interface Participant {
  id: string;
  name: string;
  availability: string[];
}
