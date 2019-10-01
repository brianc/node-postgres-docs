import config from '../config'
const forcedNavOrder = config.sidebar.forcedNavOrder

// TODO(bmc) this entire file makes me sad - need to refactor this when I have more time
// most of this was forked from the open source repo I cloned and quickly banged into shape
export default function getSortedNavItems(allMdx) {
  const allFields = allMdx.edges.map(({ node }) => node.fields || {})
  const navItems = allMdx.edges
    .map(({ node }) => node.fields)
    .reduce(
      (acc, fields) => {
        const { slug: cur, title } = fields

        const containingSlug = allFields.find(({ slug: otherSlug }) => {
          // is this slug contained within another one (e.g. is this a 'header' slug?)
          return cur !== '/' && cur !== otherSlug && otherSlug.indexOf(cur) === 0
        })

        const newItem = {
          title,
          hasChildren: Boolean(containingSlug),
          url: cur,
          slug: cur,
          filename: fields.filename.name,
        }
        
        const prefix = '/' + cur.split('/')[1]

        if (forcedNavOrder.some(url => url === prefix)) {
          return { ...acc, [prefix]: [...acc[prefix] || [], { ...newItem }] }
        } else {
          return { ...acc, items: [...acc.items, newItem] }
        }
      },
      { items: [] }
    )

  const sortedTree = forcedNavOrder
    .reduce((acc, cur) => {
      const things = navItems[cur].sort((a, b) => {
        if (!a.hasChildren && !b.hasChildren) {
          return a.filename.localeCompare(b.filename)
        }
      })
      return acc.concat(things)
    }, [])
    .concat(navItems.items)
  return sortedTree
}
