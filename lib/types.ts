export type AnswerOption = 'yes' | 'somewhat' | 'no';

export interface Question {
  id: string;
  text: string;
}

export interface RoadmapResource {
  title: string;
  url: string;
}

export interface RoadmapSection {
  title: string;
  items: string[];
  resources?: RoadmapResource[];
}

export interface RoadmapLevelData {
  summary: string;
  sections: RoadmapSection[];
}

export type Level = 'beginner' | 'intermediate' | 'pro';

export interface Roadmap {
  beginner: RoadmapLevelData;
  intermediate: RoadmapLevelData;
  pro: RoadmapLevelData;
}

export interface Skill {
  id: string;
  name: string;
  keywords: string[];
  questions: Question[]; // 10
  roadmap: Roadmap;
}


