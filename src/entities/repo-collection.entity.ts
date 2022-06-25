import { Repo } from './repo.entity'

export interface RepoCollection {
  language: string
  repositories: Repo[]
}
