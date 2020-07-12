# My Notion Blog

Next.jsのSSR・SSGを利用したでブログ
Notionで書いたPageを元にブログの記事とする

[notion-blog](https://github.com/ijjk/notion-blog) を参考にアイデアを真似しました。
[react-notion](https://github.com/splitbee/react-notion) を使ってコードを整理しました。

## 機能 
- notionで書いた記事をブログの記事として流用できる。
- "Link"に貼った自分のNotionのリンクを参照する機能
- 記事ごとのタグづけ
- sitemapを生成するAPIを実装
- firebase 追加によるアナリティクスが可能
- "strict": true へ変更
- Next.js 9.4に更新ずみ

個人のブログだが機能追加や改修ごとの差分がわかりやすいよう、PullRequestをマージしていくことで改修する。

## 環境変数

### `.env`の記述

```
NOTION_TOKEN=<your-token>
BLOG_INDEX_ID=<your-blog-index-id>

BLOG_HOME_NOTION_URL=<your-notion-url>
BLOG_PROFILE_NOTION_URL=<your-notion-url>

NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
NEXT_PUBLIC_FIREBASE_DATABASE_URL=<your-database-url>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<your-measurement-id>

NEXT_PUBLIC_SITE_VERIFICATION=<your-verification-code>
```

NOTION_TOKEN,BLOG_INDEX_IDはnotionのプライベートapiから値を取得するために使う。
BLOG_HOME_NOTION_URL, BLOG_PROFILE_NOTION_URLはコンポーネントとして使うnotion pageのurl
"NEXT_PUBLIC_FIREBASE_"から始まる環境変数は、firebaseをプロジェクトに追加するために必要。

"NEXT_PUBLIC_"のprefixはがついたものは、バンドルに含まれる。
(https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables)

### now secretsへの追加
nowでデプロイするため、now.jsonの記述が環境変数と対応する。
例えば"NOTION_TOKEN"は、"notion-token"としている。
これを次のようなコマンドで追加する必要がある。

```
now secrets add notion-token <token>
```

### When token is changed

Procedure when the token of notion changes

```
now secrets ls
now secrets rm notion-token
now secrets add notion-token <token>
```

## Creating Your Pages Table

### Manually Creating the Table

1. Create a blank page in Notion
2. Create a **inline** table on that page, don't use a full page table as it requires querying differently
3. Add the below fields to the table

#### properties
The table should have the following properties:

- `Page`: this the blog post's page
- `Slug`: this is the blog post's slug relative to `/blog`, it should be a text property
- `Published`: this filters blog posts in **production**, it should be a checkbox property
- `Date`: this is when the blog post appears as posted, it should be a date property
- `Authors`: this is a list of Notion users that wrote the post, it should be a person property
- `Tags`: This is the article tags
- `Link`: If you put your own Notion Page link here, the page reference will take precedence

Example
  ![Example Blog Posts Table](./public/table-view.png)

## Running Locally

1. Install dependencies `yarn`
2. Create and describe an `.env`
3. Run next in development mode `yarn dev`
4. Build and run in production mode `yarn build && yarn start`
