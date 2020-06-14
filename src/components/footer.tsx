import { Twitter } from 'components/svgs/twitter'
import { Instagram } from 'components/svgs/Instagram'
import { textBlock } from 'lib/notion/renderers'

export default () => {
  const contacts = [
    {
      Comp: Twitter,
      alt: 'twitter icon',
      link: 'https://twitter.com/saitokun13',
    },
    {
      Comp: Instagram,
      alt: 'instagram icon',
      link: 'https://www.instagram.com/yoppe13',
    },
  ]

  const name = 'yoppe'

  const text = [
    '2年目のwebエンジニア。Notionを利用してwebや料理などのブログを書き始めた。趣味でiOSアプリを作っているが無限に完成しない。'
  ]

  return (
    <>
      <footer>
        <div className="explanation">
          <h2>Profile</h2>
          <a>
            <img src="/profile.jpg" id="profile" alt="yoppe" />
          </a>
          <p>{name}</p>
          <p id="explain">{text}</p>

          {contacts.map(({ Comp, link, alt }) => {
            return (
              <a key={link} href={link} aria-label={alt}>
                <Comp height={32} />
              </a>
            )
          })}
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
        background-color: ghostwhite;
      }

      #explain {
        text-align: start;
        margin: 10px auto;
      }

      #profile {
        width: 4rem;
        height: 4rem;
        border-radius: 9999px;
      }

      img {
        margin: 0.5rem;
      }

      svg {
        margin: 0.5rem;
      }
      
    `}</style>
    </>
  )
}
