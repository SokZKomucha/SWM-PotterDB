/**
 * Represents a singular book, obtained by requesting `api.potterdb.com/v1/books/{id}`
 */
export interface Book {
  data?: {
    id: string,
    type: string,
    attributes?: {
      slug: string | null,
      author: string | null,
      cover: string | null,
      dedication: string | null,
      pages: number | null,
      release_date: string | null,
      summary: string | null,
      title: string | null,
      wiki: string | null
    },
    relationships?: {
      chapters?: {
        data?: { id: string, type: string }[]
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

/**
 * Represents a list of books, obtained by requesting `api.potterdb.com/v1/books`
 */
export interface Books {
  data?: {
    id: string,
    type: string,
    attributes?: {
      slug: string | null,
      author: string | null,
      cover: string | null,
      dedication: string | null,
      pages: number | null,
      release_date: string | null,
      summary: string | null,
      title: string | null,
      wiki: string | null
    },
    relationships?: {
      chapters?: {
        data?: { id: string, type: string }[]
      }
    },
    links?: {
      self: string | null
    }
  }[],
  meta?: {
    pagination?: {
      current: number | null,
      records: number | null
    },
    copyright?: string | null,
    generated_at: string | null
  },
  links?: {
    self: string | null,
    current: string | null
  }
}