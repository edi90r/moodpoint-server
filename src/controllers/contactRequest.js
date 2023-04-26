import 'core-js/stable'
import 'regenerator-runtime/runtime'
import ContactRequestModel, {
  validateContactRequestSchema,
  validateContactRequestNoteSchema,
} from '../model/contactRequest'

export const addContactRequest = async (req, res) => {
  try {
    await validateContactRequestSchema(req.body.data)

    let contactRequest = new ContactRequestModel({
      source: {
        userId: req?.body?.data?.source.userId,
        deviceId: req?.body?.data?.source.deviceId,
      },
      timestamp: req?.body?.data?.timestamp,
      resolve: req?.body?.data?.resolve,
    })

    contactRequest = await contactRequest.save()

    return res.json({
      success: true,
      data: contactRequest,
      message: 'Prośba kontaktu została zgłoszona',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: [],
      message: error,
    })
  }
}

export const updateContactrequest = async (req, res) => {
  try {
    const editedContactRequest = await ContactRequestModel.findOneAndUpdate(
      { _id: req.params.id },
      [{ $set: { resolve: { $not: '$resolve' } } }],
      {
        new: true,
      }
    )

    if (!editedContactRequest) {
      return res.status(404).json({
        success: false,
        data: [],
        message: 'Użytkownik o podanym id nie istnieje',
      })
    }
    return res.json({
      success: true,
      data: editedContactRequest,
      message: 'Prośba o kontakt zmieniona !',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: [],
      message: error,
    })
  }
}

export const addNoteToContactrequest = async (req, res) => {
  try {
    await validateContactRequestNoteSchema(req.body)

    const { text, timestamp } = req.body.note

    const editedContactRequest = await ContactRequestModel.findOneAndUpdate(
      { _id: req.params.id },
      [{ $addFields: { note: { text, timestamp } } }],
      {
        new: true,
      }
    )

    if (!editedContactRequest) {
      return res.status(404).json({
        success: false,
        data: [],
        message: 'Prośba o kontakt o podanym id nie istnieje',
      })
    }
    return res.json({
      success: true,
      data: editedContactRequest,
      message: 'Notatka została dodana !',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: [],
      message: error,
    })
  }
}

export const getContactRequestsOfUserByDate = async (req, res) => {
  try {
    const now = new Date(req.query.date).getTime()
    const startOfDate = new Date(now - (now % 86400000)).toISOString()
    const endOfDate = new Date(
      now - (now % 86400000) + (86400000 - 1)
    ).toISOString()

    const users = await ContactRequestModel.find({
      $and: [
        { 'source.userId': req.params.id },
        { timestamp: { $gte: startOfDate, $lte: endOfDate } },
      ],
    })

    if (!users) {
      return res.status(404).json({
        success: false,
        data: [],
        message: 'Nie znaleziono żadnego użytkownika',
      })
    }

    return res.status(200).json({
      success: true,
      data: users,
      message: 'Pobrano prośby kontaktu !',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: [],
      message: error,
    })
  }
}

export const isWithin = async (req, res) => {
  try {
    const latest = await ContactRequestModel.findOne({
      'source.userId': req.params.id,
    })
      .sort({ timestamp: -1 })
      .limit(1)

    if (!latest) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'Nie dodano żadnych próśb kontaktu',
      })
    }
    const now = new Date().getTime()
    const contactRequestTime = new Date(latest.timestamp).getTime()
    const diffInMS = now - contactRequestTime
    const msInHour = Math.floor(diffInMS / 1000 / 60)

    if (msInHour < 60) {
      return res.status(200).json({
        success: true,
        within: true,
        data: { timeToLeft: diffInMS },
        message: 'Nie możesz dodać kolejnej prośby o kontakt',
      })
    }

    return res.status(200).json({
      success: true,
      within: false,
      data: [],
      message: 'Dodaj kolejną prośbę o kontakt',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: [],
      message: error,
    })
  }
}
