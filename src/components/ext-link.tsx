export default props => (
  <>
    <a {...props} rel="noopener" target={props.target || '_blank'} />
    <style jsx>{`
      a {
        font-size: 0.75rem;
        padding: 5px;
      }
    `}</style>
  </>
)
