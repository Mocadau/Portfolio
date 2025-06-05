export interface ProjectData {
  title: string;
  description: string;
  field: string;
  category: string;
}

export interface ProjectProps {
  title: string;
  description: string;
  field: string;
  category: string;
  index: number;
  className?: string;
}

export interface ProjectInteractionProps {
  TopInteraction: any;
  BottomInteraction: any;
  onClick?: () => void;
}
