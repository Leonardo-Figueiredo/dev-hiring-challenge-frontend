import { gql } from '@apollo/client'
import { Repo } from '../../../entities/repo.entity'

export interface DestroyRepoVars {
  repository_github_id: number
}
export interface DestroyRepo {
  destroyOne: Repo
}

export const DESTROY_REPO = gql`
  mutation destroyOne($repository_github_id: Int!) {
    destroyOne(repository_github_id: $repository_github_id) {
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
`
