export interface Repo {
  db_id?: string
  id: number
  name?: string
  full_name?: string
  description?: string
  html_url?: string
  url?: string
  stargazers_count?: number
  watchers_count?: number
  language?: string
  open_issues?: number
  forks?: number
  watchers?: number
  is_storaged?: boolean
  created_at?: Date
  updated_at?: Date
  storaged_at?: Date
}
