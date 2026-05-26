import { BilingualString } from "./blog";
import { getDbStories } from "@/lib/db";

export type Story = {
  id: string;
  patientName: string;
  departmentSlug: string;
  departmentName: BilingualString;
  quote: BilingualString;
  image: string;
  galleryImages?: string[];
  imagePosition?: string;
  status?: 'pending' | 'approved';
};

const initialStories: Story[] = [];

declare global {
  var __stories: Story[] | undefined;
}

export const stories: Story[] = (globalThis as any).__stories ?? initialStories;

if (!(globalThis as any).__stories) {
  (globalThis as any).__stories = stories;
}

export async function getStories(): Promise<Story[]> {
  const allStories = await getDbStories(initialStories);
  return allStories.filter(story => story.status !== 'pending');
}

export async function getAllStories(): Promise<Story[]> {
  return await getDbStories(initialStories);
}
