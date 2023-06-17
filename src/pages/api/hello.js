// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log('process.env.OPENAI_API_KEY', process.env.OPENAI_API_KEY)
  res.status(200).json({ name: 'John Doe' })
}
