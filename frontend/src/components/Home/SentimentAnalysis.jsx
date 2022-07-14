import { Flex, Text, Spacer } from '@chakra-ui/react'
import { useState } from 'react'
import SelectSubreddit from './SelectSubreddit'
import SentimentAnalysisTable from './SentimentAnalysisTable'

const SentimentAnalysis = () => {
  const [selection, setSelection] = useState('wallstreetbets')

  return (
    <>
      <Flex mb="5" wrap="wrap" justifyContent="space-between">
        <Text
          p="2"
          bg="green.600"
          roundedRight="20"
          fontSize="4xl"
          color="white"
          boxShadow="xl"
          fontWeight="thin"
          h="70px"
        >
          Trending Stocks:
        </Text>
        {localStorage.getItem('key') ?
          <SelectSubreddit
            selection={selection}
            onSelectionChange={setSelection}
          /> : null}
      </Flex>
      {
        localStorage.getItem('key') ? <SentimentAnalysisTable selection={selection} /> :
          <Flex>
            <Spacer />
            <Text mb="10" bg="whiteAlpha.700" p="2" rounded="5" fontSize="4xl" color="red">
              ***Please log in to view Sentiment Analysis.***
            </Text>
            <Spacer />
          </Flex>
      }
    </>
  )
}

export default SentimentAnalysis
