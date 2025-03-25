export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      tests: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          imageUrl: string;
          duration: number;
          isPopular: boolean;
          isNew: boolean;
          category: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          description?: string | null;
          imageUrl: string;
          duration?: number;
          isPopular?: boolean;
          isNew?: boolean;
          category?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          imageUrl?: string;
          duration?: number;
          isPopular?: boolean;
          isNew?: boolean;
          category?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      test_participants: {
        Row: {
          id: string;
          test_id: string;
          user_id: string | null;
          completed: boolean;
          satisfaction_rating: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          test_id: string;
          user_id?: string | null;
          completed?: boolean;
          satisfaction_rating?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          test_id?: string;
          user_id?: string | null;
          completed?: boolean;
          satisfaction_rating?: number | null;
          created_at?: string;
        };
      };
    };
    Views: {
      test_statistics: {
        Row: {
          id: string;
          title: string;
          imageUrl: string;
          isPopular: boolean;
          isNew: boolean;
          category: string | null;
          participants_count: number;
          avg_satisfaction: number;
          participants_last_7_days: number;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
} 