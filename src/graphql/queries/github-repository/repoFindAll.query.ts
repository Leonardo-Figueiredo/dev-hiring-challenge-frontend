import { gql } from '@apollo/client'
import { RepoCollection } from '../../../entities/repo-collection.entity'

export interface RepoFindAll {
  repoFindAll: RepoCollection[]
}

export const REPO_FIND_ALL = gql`
  query repoFindAll {
    repoFindAll {
      language
      repositories {
        db_id
        id
        name
        full_name
        description
        html_url
        url
        stargazers_count
        watchers_count
        language
        open_issues
        forks
        watchers
        is_storaged
        created_at
        updated_at
        storaged_at
      }
    }
  }
`
