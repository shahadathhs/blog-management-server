import { FilterQuery, QueryOptions } from 'mongoose'

const buildSearchQuery = (
  search?: string,
  fields: string[] = []
): FilterQuery<unknown> => {
  if (!search || fields.length === 0) return {}

  const searchConditions = fields.map(field => ({
    [field]: { $regex: search, $options: 'i' }
  }))

  return { $or: searchConditions }
}

const buildFilterQuery = (
  filter?: string,
  field: string = ''
): FilterQuery<unknown> => {
  if (!filter || !field) return {}
  return { [field]: filter }
}

const buildSortOptions = (
  sortBy?: string,
  sortOrder?: 'asc' | 'desc'
): QueryOptions => {
  const sortOptions: QueryOptions = {}
  if (sortBy) {
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1
  }
  return sortOptions
}

export const buildQuery = (
  params: any, // eslint-disable-line
  searchFields: string[],
  filterField: string
) => {
  const { search, filter, sortBy, sortOrder } = params

  // Combine search and filter queries
  const query = {
    ...buildSearchQuery(search, searchFields),
    ...buildFilterQuery(filter, filterField)
  }

  // Build sort options
  const sortOptions = buildSortOptions(sortBy, sortOrder)

  return { query, sortOptions }
}
