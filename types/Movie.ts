/**
 * Represents a singular movie, obtained by requesting `api.potterdb.com/v1/movies/{id}`
 */
export interface Movie {
  data?: {
    id: string,
    type: string,
    attributes?: {
      slug: string | null,
      box_office: string | null
      budget: string | null
      cinematographers: string[],
      directors: string[],
      distributors: string[],
      editors: string[],
      music_composers: string[],
      producers: string[],
      screenwriters: string[],
      poster: string | null,
      rating: string | null,
      release_date: string | null,
      running_time: string | null,
      summary: string | null,
      title: string | null,
      trailer: string | null,
      wiki: string | null
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
 * Represents a list of movies, obtained by requesting `api.potterdb.com/v1/movies`
 */
export interface Movies {
  data?: {
    id: string,
    type: string,
    attributes?: {
      slug: string | null,
      box_office: string | null
      budget: string | null
      cinematographers: string[],
      directors: string[],
      distributors: string[],
      editors: string[],
      music_composers: string[],
      producers: string[],
      screenwriters: string[],
      poster: string | null,
      rating: string | null,
      release_date: string | null,
      running_time: string | null,
      summary: string | null,
      title: string | null,
      trailer: string | null,
      wiki: string | null
    },
    links?: {
      self: string | null
    }
  }[],
  meta?: {
    pagination?: {
      self: number | null,
      current: number | null
    },
    copyright: string | null,
    generated_at: string | null
  },
  links?: {
    self: string | null,
    current: string | null
  }
}