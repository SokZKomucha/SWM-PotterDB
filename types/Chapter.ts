export default interface Chapter {
  data?: {
    id: string,
    type: string,
    attributes?: {
      slug: string | null,
      order: number | null,
      summary: string | null,
      title: string | null
    },
    relationships?: {
      book?: {
        data?: {
          id: string,
          type: string
        }
      }
    },
    links?: {
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