import express from 'express'
import { isAuth } from '../controllers/admin'
import {
  getUser,
  getUsers,
  addUser,
  editUser,
  deleteUser,
  loginUser,
  logoutUser,
  isUserAuth,
  authUser,
  isResourceExists,
  editUserCredentials,
} from '../controllers/user'
import { addMood, getUserMoods, isMoodExists } from '../controllers/mood'
import {
  addContactRequest,
  updateContactrequest,
  addNoteToContactrequest,
  getContactRequestsOfUserByDate,
  isWithin,
} from '../controllers/contactRequest'

const router = express.Router()

router.get('/isAuth', isUserAuth)
router.get('/', isAuth, getUsers)
router.get('/:id', isAuth, getUser)
router.get('/:id/moods', isAuth, getUserMoods)
router.get('/:id/moods/exists/:date?', authUser, isMoodExists)
router.get('/:id/contactRequests/isWithin', authUser, isWithin)
router.get(
  '/:id/contactRequests/:date?',
  isAuth,
  getContactRequestsOfUserByDate
)

router.post('/login', loginUser)
router.post('/', isAuth, addUser)
router.post('/moods', authUser, addMood)
router.post('/contactRequests', authUser, addContactRequest)
router.post('/isResourceExists', isAuth, isResourceExists)

router.put('/:id/edit', isAuth, editUser)
router.put('/:id/credentials', isAuth, editUserCredentials)
router.put('/:id/contactRequests/resolve', isAuth, updateContactrequest)
router.put('/:id/contactRequests/note', isAuth, addNoteToContactrequest)

router.delete('/logout', logoutUser)
router.delete('/:id/delete', isAuth, deleteUser)

export default router
