export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          provider: string;
          provider_account_id: string;
          refresh_token: string | null;
          access_token: string | null;
          expires_at: number | null;
          token_type: string | null;
          scope: string | null;
          id_token: string | null;
          session_state: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          provider: string;
          provider_account_id: string;
          refresh_token?: string | null;
          access_token?: string | null;
          expires_at?: number | null;
          token_type?: string | null;
          scope?: string | null;
          id_token?: string | null;
          session_state?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          provider?: string;
          provider_account_id?: string;
          refresh_token?: string | null;
          access_token?: string | null;
          expires_at?: number | null;
          token_type?: string | null;
          scope?: string | null;
          id_token?: string | null;
          session_state?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      
      login_history: {
        Row: {
          id: string;
          account_id: string;
          login_method: string;
          login_time: string;
          ip_address: string | null;
          user_agent: string | null;
          is_success: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          account_id: string;
          login_method: string;
          login_time?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          is_success?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          account_id?: string;
          login_method?: string;
          login_time?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          is_success?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "login_history_account_id_fkey";
            columns: ["account_id"];
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          }
        ];
      };
      
      sessions: {
        Row: {
          id: string;
          session_token: string;
          user_id: string;
          expires: string;
        };
        Insert: {
          id?: string;
          session_token: string;
          user_id: string;
          expires: string;
        };
        Update: {
          id?: string;
          session_token?: string;
          user_id?: string;
          expires?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sessions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      
      tests: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          image_url: string | null;
          participants: number;
          likes: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
          category: string | null;
          duration: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          image_url?: string | null;
          participants?: number;
          likes?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          category?: string | null;
          duration?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          image_url?: string | null;
          participants?: number;
          likes?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          category?: string | null;
          duration?: string | null;
        };
        Relationships: [];
      };
      
      test_card_stats: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          thumbnail_url: string | null;
          participation_count: number | null;
          like_count: number | null;
          is_active: boolean | null;
          created_at: string | null;
          updated_at: string | null;
          category: string | null;
          duration: string | null;
        };
        Insert: {
          id: string;
          title: string;
          description?: string | null;
          thumbnail_url?: string | null;
          participation_count?: number | null;
          like_count?: number | null;
          is_active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
          category?: string | null;
          duration?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          thumbnail_url?: string | null;
          participation_count?: number | null;
          like_count?: number | null;
          is_active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
          category?: string | null;
          duration?: string | null;
        };
        Relationships: [];
      };
      
      users: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          email_verified: string | null;
          image: string | null;
          created_at: string;
          updated_at: string;
          role: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          email?: string | null;
          email_verified?: string | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
          role?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string | null;
          email_verified?: string | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
          role?: string;
        };
        Relationships: [];
      };
      
      verification_tokens: {
        Row: {
          identifier: string;
          token: string;
          expires: string;
        };
        Insert: {
          identifier: string;
          token: string;
          expires: string;
        };
        Update: {
          identifier?: string;
          token?: string;
          expires?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
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