# My Notion Blog

ここでは、vercel 社の`notion-blog` をクローンして改修している。
これは notion のプライベート API を外部データとして Static Generation する MIT ライセンスのリポジトリ。
[notion-blog リポジトリ](https://github.com/ijjk/notion-blog)

機能追加や改修ごとの差分がわかりやすいよう、基本的に PullRequest をマージしていくことで改修する。

## 環境変数

src/lib/notion/server-constants.js で、process.env つまり環境変数を参照して自分の Notion の id と token を設定する。

このリポジトリでは`dotenv`で管理する。

`.env`の記述

```
NOTION_TOKEN=<your-token>
BLOG_INDEX_ID=<your-blog-index-id>
```

なお、Next.js の`getStaticProps`による Static Generation のために使用するため、ここで指定する環境変数は、本番環境ではビルド時にのみ実行される。JS バンドルに含まれることはない。

## Creating Your Pages Table

**Note**: this is auto run if a table isn't detected the first time visiting `/blog`

### Using the Pre-Configured Script

1. Create a blank page in Notion
2. Clone this repo `git clone https://github.com/ijjk/notion-blog.git`
3. Install dependencies `cd notion-blog && yarn`
4. Run script to create table `NOTION_TOKEN='token' BLOG_INDEX_ID='new-page-id' node scripts/create-table.js` See [here](#getting-blog-index-and-token) for finding the id for the new page

### Manually Creating the Table

1. Create a blank page in Notion
2. Create a **inline** table on that page, don't use a full page table as it requires querying differently
3. Add the below fields to the table

#### originals

The table should have the following properties:

- `Page`: this the blog post's page
- `Slug`: this is the blog post's slug relative to `/blog`, it should be a text property
- `Published`: this filters blog posts in **production**, it should be a checkbox property
- `Date`: this is when the blog post appears as posted, it should be a date property
- `Authors`: this is a list of Notion users that wrote the post, it should be a person property
  ![Example Blog Posts Table](./assets/table-view.png)

#### extentions

こちらは本リポジトリで追加した機能なので自分で追加する:

- `Tags`: This is the article tags
- `Link`: If you put your own Notion Page link here, the page reference will take precedence

## Running Locally

1. Install dependencies `yarn`
2. Create and describe an `.env` file``NOTION_TOKEN=<your-token>`,`BLOG_INDEX_ID=<your-blog-index-id>`
3. Run next in development mode `yarn dev`
4. Build and run in production mode `yarn build && yarn start`

## When token is changed

Procedure when the token of notion changes

```
now secrets ls
now secrets rm notion-token
now secrets add notion-token <token>
```

## Acknowledgments

[notion-blog リポジトリ](https://github.com/ijjk/notion-blog)より引用。ありがとうございます。Vercel は神。

> - Guillermo Rauch @rauchg for the initial idea
> - Shu Ding @shuding\_ for the design help
> - Luis Alvarez @luis_fades for design help and bug catching
