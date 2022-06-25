import { gql } from '@apollo/client'
import { Repo } from '../../../entities/repo.entity'

export interface FindOneRepoInput {
  repository_full_name: string
}

export interface FindOneRepo {
  repoFindOne: Repo
}

export const REPO_FIND_ONE = gql`
  query repoFindOne($repository_full_name: String!) {
    repoFindOne(repository_full_name: $repository_full_name) {
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
