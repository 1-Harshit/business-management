const users = [
  {
    name: "Harshit Raj",
    avatar: "/static/images/avatars/harshit.jpg",
    jobtitle: "Maintainer",
  },
  {
    name: "Manoj Kumar",
    avatar: "/static/images/avatars/manoj.jpg",
    jobtitle: "Partner PSE",
  },
  {
    name: "Kiran Gupta",
    avatar: "/static/images/avatars/kiran.jpg",
    jobtitle: "Partner PSE",
  },
  {
    name: "Invalid",
    avatar: "/static/images/avatars/invalid.jpg",
    jobtitle: "Imposter",
  },
]

// localStorage must be mounted before calling this
const getUser = () => {
  try {
    const userid = localStorage.getItem("userid")
    switch (userid) {
      case "harshit":
        return users[0]
      case "manoj":
        return users[1]
      case "kiran":
        return users[2]
      default:
        return users[3]
    }
  } catch {
    return users[3]
  }
}

export { getUser }
export default getUser