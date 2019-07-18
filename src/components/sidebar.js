import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'react-emotion'
import { ExternalLink } from 'react-feather'
import Link from './link'
import './styles.css'
import config from '../../config'
import getSortedNavItems from '../sortNavItems'

const Sidebar = styled('aside')`
  width: 100%;
  /* background-color: rgb(245, 247, 249); */
  /* border-right: 1px solid #ede7f3; */
  height: 100vh;
  overflow: auto;
  position: fixed;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  padding-right: 0;
  background-color: #372476;
  /* Safari 4-5, Chrome 1-9 */
  background: linear-gradient(#372476, #3b173b);
  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#372476), to(#3b173b));
  /* Safari 5.1, Chrome 10+ */
  background: -webkit-linear-gradient(top, #372476, #3b173b);
  /* Firefox 3.6+ */
  background: -moz-linear-gradient(top, #372476, #3b173b);
  /* IE 10 */
  background: -ms-linear-gradient(top, #372476, #3b173b);
  /* Opera 11.10+ */
  background: -o-linear-gradient(top, #372476, #3b173b);
  @media only screen and (max-width: 767px) {
    padding-left: 0px;
    background-color: #372476;
    background: #372476;
  }
  @media (min-width: 767px) and (max-width: 1023px) {
    padding-left: 0;
  }
  @media only screen and (max-width: 1023px) {
    width: 100%;
    position: relative;
    height: auto;
  }
`

const ListSection = styled('li')`
  color: white;
  padding-left: 1rem;
  font-weight: lighter;
  font-size: 14px;
  padding: 0.45rem 0 0.45rem 1rem;
  cursor: default;
`

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({ className, active, level, ...props }) => {
  if (level === 0) {
    return (
      <li className={className}>
        <Link {...props} />
      </li>
    )
  } else if (level === 1) {
    const customClass = active ? 'active' : ''
    return (
      <li className={'subLevel ' + customClass}>
        <Link {...props} />
      </li>
    )
  } else {
    return (
      <li className={className}>
        <Link {...props} />
      </li>
    )
  }
})`
  list-style: none;

  a {
    color: #fff;
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${props => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;

    &:hover {
      background-color: #542683;
    }

    ${props =>
      props.active &&
      `
      color: #fff;
      background-color: #473485;
    `} // external link icon
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`

const Divider = styled(props => (
  <li {...props}>
    <hr />
  </li>
))`
  list-style: none;
  padding: 0.5rem 0;

  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid #ede7f3;
  }
`

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
                filename {
                  name
                }
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      const sortedTree = getSortedNavItems(allMdx)

      const nav = sortedTree.map(({ slug, hasChildren }) => {
        const { node } = allMdx.edges.find(({ node }) => node.fields.slug === slug)
        if (hasChildren) {
          // nested path
          return <ListSection key={node.fields.slug}>{node.fields.title}</ListSection>
        }

        const isActive =
          location &&
          (location.pathname === node.fields.slug || location.pathname === config.gatsby.pathPrefix + node.fields.slug)

        return (
          <ListItem
            key={node.fields.slug}
            to={`${node.fields.slug}`}
            level={node.fields.slug.split('/').length - 2}
            active={isActive}
          >
            {node.fields.title}
          </ListItem>
        )
      })

      return (
        <Sidebar>
          <ul className={'sideBarUL'}>
            {nav}
            <Divider />
            {config.sidebar.links.map((link, key) => {
              if (link.link !== '' && link.text !== '') {
                return (
                  <ListItem key={key} to={link.link}>
                    {link.text}
                    <ExternalLink size={14} />
                  </ListItem>
                )
              }
            })}
          </ul>
        </Sidebar>
      )
    }}
  />
)

export default SidebarLayout
