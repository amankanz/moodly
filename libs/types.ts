// Gradients Interface
export interface Gradients {
  [key: string]: string[]; // Keys are strings (e.g., 'pink', 'red') and values are arrays of color hex codes
}

// BaseRating Interface
export interface BaseRating {
  [key: string]: number; // Keys are strings representing indices, and values are numeric ratings
}

// DemoData Interface
export interface DemoData {
  [key: string]: number; // Keys are strings (specific indices), and values are numeric data points
}
