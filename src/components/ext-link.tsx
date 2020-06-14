const extLink = (props: any) => (
  <>
    <a {...props} rel="noopener" target={props.target || '_blank'} />
    <style jsx>{`
      a {
        font-size: 0.75rem;
        border-bottom: 1px dashed black;
      }
    `}</style>
  </>
)

export default extLink
