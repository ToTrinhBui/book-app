import React from "react";
import { Link } from 'react-router-dom';

export default function Footer(props) {

    return (
        <footer>
            {props.isShow && props.content !== 'Edit' ? (
                <button className="submit" form="form-book" type="submit">{props.content}</button>
            ) : (
                props.content === 'Edit' && (
                    <Link to={`/edit/${props.data.id}`}><button className="submit">{props.content}</button></Link>
                )
            )}
            <div className="grid">
                <div >
                    <h3>Môn học</h3>
                    <p>XXXXXXXXX</p>
                </div>

                <div >
                    <h3>Giảng viên hướng dẫn</h3>
                    <p>XXXXXXXXX</p>
                </div>

                <div >
                    <h3>Sinh viên thực hiện</h3>
                    <p>Bùi Tố Trinh</p>
                </div>

                <div >
                    <h3>Mã sinh viên</h3>
                    <p>B19DCCNXXX</p>
                </div>
            </div>
        </footer>
    )
}