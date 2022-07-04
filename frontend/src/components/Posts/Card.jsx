import {
  Image, Box, Flex, IconButton, Link, Text, Spacer, Textarea,
  Button
} from '@chakra-ui/react'
import {
  AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike, AiFillEdit,
  AiOutlineEdit, AiOutlineDelete, AiOutlineCheckSquare, AiOutlineCloseSquare
} from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AddReply from './AddReply'

//TODO: abstract out the functions and components.
const Card = (props) => {
  const [isLikeActive, setIsLikeActive] = useState(false)
  const [isDislikeActive, setIsDislikeActive] = useState(false)
  const [isReplyActive, setIsReplyActive] = useState(false)
  const [isEditActive, setIsEditActive] = useState(false)
  const [isDeleteActive, setIsDeleteActive] = useState(false)
  const [editedContent, setEditedContent] = useState('')
  const isComment = props.post
  const isPost = !isComment
  const isCommentReply = isComment && props.parent != null
  const url = isPost ?
    'https://ever-green-production.herokuapp.com/stockmarket/posts/' + props.id + '/' :
    'https://ever-green-production.herokuapp.com/stockmarket/comments/' + props.id + '/'

  const [userObj, setUserObj] = useState('')
  useEffect(() => {
    const userUrl = 'https://ever-green-production.herokuapp.com/stockmarket/users/?search=' + props.name
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') }
    }
    fetch(userUrl, requestOptions)
      .then(response => response.json())
      .then(data => setUserObj(data[0]))
  }, [props.name])

  const DeleteRequest = () => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') }
    }
    fetch(url, requestOptions)
      .then(response => {
        response.json()
        window.location.reload(false) // solves the double-click reload problem
      })
  }

  const EditContentRequest = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('key')
      },
      body: JSON.stringify({
        "content": editedContent + "\n\n*Edited on: " + new Date().toLocaleString().replace(",", "")
      })
    }
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(() => window.location.reload(false))
  }

  function handleLikeClick() { // Also needs to track whether the user has liked, in memory.
    const userIdUrl = 'https://ever-green-production.herokuapp.com/stockmarket/users/' + userObj.id + "/"

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Token ' + localStorage.getItem('key')
      },
      body: new URLSearchParams({
        "likes": isLikeActive ? props.likes : props.likes + 1,
        // the number of dislikes must always be the original that you see. 
        "dislikes": props.dislikes
      })
    }
    fetch(url, requestOptions).then(response => response.json()).then(data => console.log(data))

    const requestOptions2 = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Token ' + localStorage.getItem('key')
      },
      body: new URLSearchParams({
        "totalLikes": isLikeActive ? userObj.totalLikes : userObj.totalLikes + 1,
        "totalDisLikes": userObj.totalDisLikes
      })
    }
    fetch(userIdUrl, requestOptions2).then(response => response.json()).then(data => console.log(data))
  }

  function handleDislikeClick() {
    const userIdUrl = 'https://ever-green-production.herokuapp.com/stockmarket/users/' + userObj.id + "/"

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Token ' + localStorage.getItem('key')
      },
      body: new URLSearchParams({
        "likes": props.likes,
        "dislikes": isDislikeActive ? props.dislikes : props.dislikes + 1
      })
    }
    fetch(url, requestOptions).then(response => response.json()).then(data => console.log(data))

    const requestOptions2 = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Token ' + localStorage.getItem('key')
      },
      body: new URLSearchParams({
        "totalLikes": userObj.totalLikes,
        "totalDisLikes": isDislikeActive ? userObj.totalDisLikes : userObj.totalDisLikes + 1
      })
    }
    fetch(userIdUrl, requestOptions2).then(response => response.json()).then(data => console.log(data))
  }

  const defaultImgUrl = "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg"
  const profileUrl = userObj.profilePicture ? userObj.profilePicture : defaultImgUrl

  if (props.comments) props.comments.sort((a, b) => a.id - b.id)

  return (
    <>
      <Flex border="1px" bg="whiteAlpha.900" mb="1">
        <Box w="70px" >
          <Image w="60px" h="60px" mt="5px" ml="5px" src={profileUrl} fallbackSrc={defaultImgUrl} />
        </Box>
        <Box w="calc(100% - 70px)" >
          <Flex borderBottom="1px" borderColor="gray.400" alignItems="center">
            <Link
              as={RouterLink}
              to={'/user/' + props.name}
              onClick={() => window.scrollTo(0, 0)}
            >
              {props.name}
            </Link>,
            {" " + new Date(props.date).toLocaleString().replace(",", "")},
            {(isComment ? " Comment id: " : " Post id: ") + props.id}
            {isCommentReply ? " | Replying to comment id: " + props.parent : null}
            <Spacer />
            {localStorage.getItem('username') === props.name ?
              <>
                <IconButton
                  _focus={{ outline: "none" }}
                  bg="none"
                  size="sm"
                  aria-label="Delete"
                  icon={isEditActive ? <AiFillEdit size="25" /> : <AiOutlineEdit size="25" />}
                  onClick={() => {
                    setIsEditActive(!isEditActive)
                  }}
                />
                {isDeleteActive ?
                  <>
                    Confirm Delete:
                    <IconButton
                      _focus={{ outline: "none" }}
                      bg="none"
                      size="sm"
                      aria-label="Confirm"
                      icon={<AiOutlineCheckSquare size="25" />}
                      onClick={() => { DeleteRequest() }}
                    />
                    <IconButton
                      _focus={{ outline: "none" }}
                      bg="none"
                      size="sm"
                      aria-label="Deny"
                      icon={<AiOutlineCloseSquare size="25" />}
                      onClick={() => { setIsDeleteActive(false) }}
                    />
                  </>
                  :
                  <IconButton
                    _focus={{ outline: "none" }}
                    bg="none"
                    size="sm"
                    aria-label="Delete"
                    icon={<AiOutlineDelete size="25" />}
                    onClick={() => { setIsDeleteActive(true) }}
                  />
                }
              </>
              : null
            }
          </Flex>
          <Box minH="120" >
            {isEditActive ?
              <Flex>
                <Box w="calc(100% - 70px)" >
                  <Textarea
                    h="120"
                    bg="gray.100"
                    placeholder="Edit Content"
                    onChange={e => setEditedContent(e.target.value)}
                  />
                </Box>
                <Box w="70px">
                  <Button
                    colorScheme="teal"
                    w="100%"
                    h="100%"
                    onClick={() => { EditContentRequest() }}>
                    Submit
                  </Button>
                </Box>
              </Flex>
              :
              <>
                <Text as="b" fontSize="xl">{isPost ? "Title: " + props.title + " " : null}</Text>
                <Text whiteSpace="pre-wrap">{props.content}</Text>
              </>
            }
          </Box>
          <Box borderTop="1px" borderColor="gray.400">
            {isLikeActive ? props.likes + 1 : props.likes}
            <IconButton
              _focus={{ outline: "none" }}
              bg="none"
              aria-label="Likes"
              size="sm"
              icon={!isLikeActive ? <AiOutlineLike size="22" /> : <AiFillLike size="22" />}
              onClick={() => {
                handleLikeClick()
                setIsLikeActive(!isLikeActive)
                setIsDislikeActive(false)
              }}
            />
            {isDislikeActive ? props.dislikes + 1 : props.dislikes}
            <IconButton
              _focus={{ outline: "none" }}
              bg="none"
              aria-label="Dislikes"
              size="sm"
              icon={!isDislikeActive ? <AiOutlineDislike size="22" /> : <AiFillDislike size="22" />}
              onClick={() => {
                handleDislikeClick()
                setIsDislikeActive(!isDislikeActive)
                setIsLikeActive(false)
              }}
            />
            <Link onClick={() => { setIsReplyActive(!isReplyActive) }}>Reply</Link>
            {isReplyActive ? <AddReply {...props} /> : null}
          </Box>
        </Box>
      </Flex >
      <Flex>
        <Box w="30px"></Box>
        <Box w="calc(100% - 30px)">
          {props.comments ? props.comments.map(obj => <Card {...obj} key={obj.id} />) : null}
        </Box>
      </Flex>
    </>
  )
}

export default Card
