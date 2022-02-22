import IndexRepository from '../database/repository/indexRepository';

const indexRepository = new IndexRepository();
const helloWorld = (req: any, res: any) => {
  res.json({ title: 'Express' });
};
const test = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await indexRepository.test();
  res.json({ data: result.data });
};

const topPosts = async (req: any, res: any) => {
  const result = await indexRepository.topPosts();
  res.json({ data: result.data });
};

const topTags = async (req: any, res: any) => {
  const result = await indexRepository.topTags();
  res.json({ data: result.data });
};
// <<<<<<< HEAD
const topArticles = async (req: any, res: any) => {
  const result = await indexRepository.topArticles();
  res.json({ data: result.data });
};
const topQuestions = async (req: any, res: any) => {
  const result = await indexRepository.topQuestions();
  res.json({ data: result.data });
};

// const search = async (req: any, res: any ) => {
//   const {searchString} = req.body;
//   const searchWords = searchString.split(" ");

//   const temp_query =  `SELECT ID, TITLE, 'QUESTION' AS TYPE
//                        FROM QUESTION
//                        WHERE `
//   let whereClause = '';
//   if( searchWords.length() ){
//     whereClause = ` LIKE '%${searchWords[0]}%'`;
//   }
//   for(let i=1;i<searchWords.length();i++){
//     whereClause = whereClause + `LIKE '${}`
//   }
//   const result = await ;
// }

export { helloWorld, test, topPosts, topTags, topQuestions, topArticles };
// =======

// export { helloWorld, test, topPosts, topTags };
// >>>>>>> 7da187ab7fc57d5e3cd52ebfb8e615a722ab6317
