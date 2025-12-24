export type ContributionType = 'story' | 'proverb' | 'voice';
export type ContributionStatus = 'pending' | 'approved' | 'rejected';

export interface Contribution {
    id: string;
    created_at: string;
    status: ContributionStatus;
    type: ContributionType;
    text?: string;
    audio_path?: string;
    theme: string;
    origin_region: string;
    origin_free_text?: string;
    lineage?: string;
    from_story_slug?: string;
    approved_at?: string;
}

export interface Story {
    id: string;
    slug: string;
    title: string;
    provenance: string;
    isAuthored: boolean;
    transcript: string[];
    tags: string[];
    daughterNote: string;
    reflectionPrompt: string;
    contributeCTA: string;
}
