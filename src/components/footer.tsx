export const Footer =  () => {
  return (
    <>
      <footer>
        <div>
          <p>&copy; copyright 2021 yoppe. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
      footer {
        display: flex;
        margin: 10px auto;
        padding: 2em 0;
        justify-content: center;
        flex-direction: column;
      }
      div {
        text-align: center;
        background-color: gray;
      }
      p {
        color: white;
        font-weight: 400;
        font-size: 0.94rem;
        line-height: 1.7;
      }
    `}</style>
    </>
  )
}
