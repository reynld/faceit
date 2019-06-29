import axios from 'axios';

export const getLevelSvg = (level) => {
    if (level) {
      return `https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${level}_svg.svg`
    }
    
    return `https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${1}_svg.svg`
};

export const getPlayerInfoById = async (id) => {
    const url = `https://api.faceit.com/core/v1/users/${id}`
    const res = await axios.get(url)
    
    return res.data
}
