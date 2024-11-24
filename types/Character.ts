/**
 * Represents a singular character, obtained by requesting `api.potterdb.com/v1/characters/{id}`
 */
export default interface Character {
  data?: {
    id: string
    type: string
    attributes: {
      alias_names: string[]
      animagus: string | null
      blood_status: string | null
      boggart: string | null
      born: string | null
      died: string | null
      eye_color: string | null
      family_members: string[]
      gender: string | null
      hair_color: string | null
      height: string | null
      house: string | null
      image: string | null
      jobs: string[]
      marital_status: string | null
      name: string | null
      nationality: string | null
      patronus: string | null
      romances: string[]
      skin_color: string | null
      slug: string | null
      species: string | null
      titles: string[]
      wands: string[]
      weight: string | null
      wiki: string | null
    }
    links: {
      self: string | null
    }
  },
  meta?: {
    copyright: string | null,
    generated_at: string | null
  },
  links?: {
    self: string | null
  }
}