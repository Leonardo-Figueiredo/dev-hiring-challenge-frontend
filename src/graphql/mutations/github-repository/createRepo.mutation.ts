import { gql } from '@apollo/client'
import { Repo } from '../../../entities/repo.entity'

export interface CreateRepoInput
  extends Omit<
    Repo,
    'db_id' | 'is_storaged' | 'created_at' | 'updated_at' | 'deleted_at'
  > {}

export interface CreateRepo {
  createRepoInput: CreateRepoInput
}

export const CREATE_REPO = gql`
  mutation createRepo($createRepoInput: CreateRepoInput!) {
    createRepo(createRepoInput: $createRepoInput) {
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
      deleted_at
    }
  }
`
