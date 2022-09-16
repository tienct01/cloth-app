import { css, CSSObject} from "styled-components";

export const mobile = (props: CSSObject) => {
    return css`
        @media only screen and (max-width: 425px) {
            ${props};
        }
    `
}
export const tablet = (props: CSSObject) => {
    return css` 
        @media only screen and (max-width: 767px){
            ${props};
        }
    `
}