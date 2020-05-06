# Notion Blog

このリポジトリは、vercel 社のの notion-blog をクローンして改修している。
https://github.com/ijjk/notion-blog

# Notion Blog

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

The table should have the following properties:

### Table Items

#### originals

- `Page`: this the blog post's page
- `Slug`: this is the blog post's slug relative to `/blog`, it should be a text property
- `Published`: this filters blog posts in **production**, it should be a checkbox property
- `Date`: this is when the blog post appears as posted, it should be a date property
- `Authors`: this is a list of Notion users that wrote the post, it should be a person property
  ![Example Blog Posts Table](./assets/table-view.png)

#### extentions

- `Tags`: This is the article tags
- `Link`: If you put your own Notion Page link here, the page reference will take precedence

## Running Locally

To run the project locally you need to follow steps 1 and 2 of [deploying](#deploy-your-own) and then follow the below steps

1. Install dependencies `yarn`
2. Expose `NOTION_TOKEN` and `BLOG_INDEX_ID` in your environment `export NOTION_TOKEN='<your-token>'`and `export BLOG_INDEX_ID='<your-blog-index-id>'` or `set NOTION_TOKEN="<your-token>" && set BLOG_INDEX_ID="<your-blog-index-id>"` for Windows
3. Run next in development mode `yarn dev`
4. Build and run in production mode `yarn build && yarn start`

## Credits

- Guillermo Rauch [@rauchg](https://twitter.com/rauchg) for the initial idea
- Shu Ding [@shuding\_](https://twitter.com/shuding_) for the design help
- Luis Alvarez [@luis_fades](https://twitter.com/luis_fades) for design help and bug catching
