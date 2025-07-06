export interface Launchpad {
    id: string;
    name?: string | null;
    full_name?: string | null;
    status: string | null;
    locality?: string | null;
    region?: string | null;
    timezone?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    launch_attempts?: number;
    launch_successes?: number;
    rockets?: string[];
    launches?: string[];
    details?: string | null;
    images?: {
        large: string[];
    };
}
