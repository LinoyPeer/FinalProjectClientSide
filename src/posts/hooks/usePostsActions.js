export default function usePostsAction() {
    const handleLike = (id) => {
        console.log(id + 'Liked');
    }
    const handleComment = (id) => {
        console.log(id + 'Commented');
    }
    const handleShare = (id) => {
        console.log(id + 'Shered');
    }
    const handleSave = (id) => {
        console.log(id + 'Saved');
    }

    return { handleLike, handleComment, handleShare, handleSave }
}

