import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import InstagramIcon from '@material-ui/icons/Instagram';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextSelector from 'text-selection-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//IMAGES
import yoghurt from '../../../images/deltai-recipe/yoghurt.jpeg';
import step1 from '../../../images/how-to-make/step1.jpeg';
import step12 from '../../../images/how-to-make/step1..jpeg';
import step2 from '../../../images/how-to-make/step2.jpeg';
import step21 from '../../../images/how-to-make/step2.1.jpeg';
import step22 from '../../../images/how-to-make/step2.3.jpeg';
import step23 from '../../../images/how-to-make/step2.4.jpeg';
import logo from '../../../images/logo/cooking.png'
import { getDetailCategoryPostAPI } from '../../../redux/actions/user/category/category';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

}));


export default function DetailRecipe() {
    const classes = useStyles();
    const { category } = useSelector(state => state.categoryReducer);
    const dispatch = useDispatch();
    const { postId } = useParams();
    useEffect(() => {
        dispatch(getDetailCategoryPostAPI(postId));
    }, []);
    return (
        <div className='detail-recipe'>
            <TextSelector
                events={[
                    {
                        text: 'BÌNH LUẬN',
                        handler: () => {
                        }
                    }
                ]}
                unmark={true}
                unmarkText='XÓA'
                color={'yellow'}
                colorText={true}
            />
            <div className={classes.root}>
                <Container>
                    {category.posts && (<>
                        <Grid container >
                            <Grid item xs={8} >
                                <div className='detail-recipe-header'>
                                    <div className='recipe-title'>
                                        <h2>
                                            {category.posts.title}
                                        </h2>
                                    </div>
                                    <div className='detail-recipe-images'>
                                        <img src={category.posts.image} />
                                    </div>
                                </div>
                                <Grid container >
                                    <Grid item xs={5}>
                                        <div className='recipe-rate'>
                                            <StarBorderIcon />
                                            <StarBorderIcon />
                                            <StarBorderIcon />
                                            <StarBorderIcon />
                                            <StarHalfIcon />
                                            <span className='recipe-like'>
                                                <ThumbUpAltIcon />
                                            </span>
                                            <span className='recipe-view'>
                                                <VisibilityIcon />
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <div className='recipe-made-it'>
                                            <Button variant="contained" color="primary">
                                                <InstagramIcon />
                                                <span>I made it</span>
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                                <div className='recipe-owner'>
                                    <span className='recipe-owner-icons'>
                                        <img src={logo} alt='logo' />
                                    </span>
                                    <span className='recipe-owner-title'>
                                        1k công thứ, 15k người theo dõi
                                    </span>
                                    <div className='recipe-owner-content'>
                                        <span>
                                            {category.posts.content}
                                        </span>
                                    </div>
                                </div>
                                <div className='recipe-ingredient'>
                                    <h3>Thành Phần</h3>
                                    {category.posts.gradients.map((gradient) => (<>
                                        <div className='recipe-ingredient-item'>
                                            {gradient.name}
                                        </div>
                                    </>))}
                                </div>
                                <div className='recipe-make'>
                                    <div className='recipe-make-step'>
                                        1.  <span>Làm trân châu nước cốt dừa: Đầu tiên, bắt nồi nước sôi, rồi cho 100gr trân châu trắng vào luộc 30 phút cho chín,
                                            rồi vớt ra cho vào thau nước lạnh để nguội.
                                        </span>
                                        <div className='recipe-make-step-images'>
                                            <span>
                                                <img src={step1} alt='step1' />
                                            </span>
                                            <span>
                                                <img src={step12} alt='step12' />
                                            </span>
                                        </div>
                                    </div>
                                    <div className='recipe-make-step'>
                                        2.  <span>
                                            Cho 200ml nước cốt dừa vào nồi, thêm 60gr sữa đặc. nấu cho sôi lăn tăn rồi cho từ từ 5gr bột bắp pha loãng đến khi nước cốt dừa hơi sệt lại.
                                            Tiếp theo cho tiếp trân châu trắng đẫ luộc vào khuấy đều rồi tắt bếp.
                                        </span>
                                        <div className='recipe-make-step-images'>
                                            <span>
                                                <img src={step2} alt='step2' />
                                            </span>
                                            <span>
                                                <img src={step21} alt='step21' />
                                            </span>
                                            <span>
                                                <img src={step22} alt='step22' />
                                            </span>
                                            <span>
                                                <img src={step23} alt='step23' />
                                            </span>
                                        </div>
                                    </div>
                                    <div className='recipe-make-step'>
                                        3.  <span>
                                            Cho 200ml nước cốt dừa vào nồi, thêm 60gr sữa đặc. nấu cho sôi lăn tăn rồi cho từ từ 5gr bột bắp pha loãng đến khi nước cốt dừa hơi sệt lại.
                                            Tiếp theo cho tiếp trân châu trắng đẫ luộc vào khuấy đều rồi tắt bếp.
                                        </span>
                                        <div className='recipe-make-step-images'>
                                            <span>
                                                <img src={step2} alt='step2' />
                                            </span>
                                            <span>
                                                <img src={step21} alt='step21' />
                                            </span>
                                            <span>
                                                <img src={step22} alt='step22' />
                                            </span>
                                            <span>
                                                <img src={step23} alt='step23' />
                                            </span>
                                        </div>
                                    </div>
                                    <div className='recipe-make-step'>
                                        4.  <span>
                                            Cho 200ml nước cốt dừa vào nồi, thêm 60gr sữa đặc. nấu cho sôi lăn tăn rồi cho từ từ 5gr bột bắp pha loãng đến khi nước cốt dừa hơi sệt lại.
                                            Tiếp theo cho tiếp trân châu trắng đẫ luộc vào khuấy đều rồi tắt bếp.
                                        </span>
                                        <div className='recipe-make-step-images'>
                                            <span>
                                                <img src={step2} alt='step2' />
                                            </span>
                                            <span>
                                                <img src={step21} alt='step21' />
                                            </span>
                                            <span>
                                                <img src={step22} alt='step22' />
                                            </span>
                                            <span>
                                                <img src={step23} alt='step23' />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='recipe-comment-big'>
                                    <h3>Bình Luận</h3>
                                    <form noValidate autoComplete="off">
                                        <span className='comment-big-text-field'>
                                            <TextField id="standard-basic" label="Bình luận" />
                                        </span>
                                        <span className='comment-big-button'>
                                            <Button variant="contained" color="primary">
                                                <InstagramIcon />
                                                <span className='comment-big-button-text'>Đăng Bài</span>
                                            </Button>
                                        </span>
                                    </form>
                                </div>
                            </Grid>
                                        {/* ----- */}
                            <Grid item xs={4} >
                                <div className='detail-recipe-right'>
                                    <Container>
                                        <h2>Bình Luận</h2>
                                        <div className='recipe-right'>
                                            <Grid container >
                                                <Grid item xs={1}>
                                                    <span>
                                                        <AccountCircleIcon />
                                                    </span>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <h3>p</h3>
                                                </Grid>
                                            </Grid>
                                            <div className='recipe-right-comment'>
                                                <input placeholder="what's your on mind?" />
                                                <div className='recipe-right-comment-button'>
                                                    <Button variant="contained" color="primary">
                                                        <InstagramIcon />
                                                        <span className='recipe-right-comment-button-text'>Đăng Bài</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Container>
                                </div>
                            </Grid>
                        </Grid>
                    </>)}
                </Container>
            </div>
        </div>
    )
}
