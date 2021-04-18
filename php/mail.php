<?php

// $email = $_POST['email'];
// $name = $_POST['name'];
// $phone = $_POST['phone'];
// $message = $_POST['message'];

// $mail_message = '
//                 <html>
//                     <head>
//                         <title>'.$subject.'</title>
//                     </head>
//                     <body>
//                         <p>E-mail: '.$_POST['email'].'</p>
//                         <p>Имя: '.$_POST['name'].'</p>
//                         <p>Телефон: '.$_POST['phone'].'</p>
//                         <p>Собшенния: '.$_POST['message'].'</p>
//                     </body>
//                 </html>';

// $subject = "=?utf-8?B?".base64_encode("Armenia Travel Contact-Us")."?=";
// $headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/html; charset=utf-8\r\n";

// $success = mail("000erik001@gmail.com", $subject, $mail_message, $headers);
// echo $success;
// $success = mail("emil.7@mail.ru", $subject, $mail_message, $headers);
// echo $success;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail ->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

// От кого письмо
$mail->From = 'cv.projects.98@gmail.com';
$mail->FromName = 'Armenia Travel';
// Кому отправить
$mail->addAddress('000erik001@gmail.com', 'Erik');
$mail->addAddress('emil.7@mail.ru', 'Emil');
// Теме письма
$mail->Subject = 'Contact us';

// Тело письма
$body = '
            <html>
                <head>
                    <title>'.$subject.'</title>
                </head>
                <body>
                    <p><strong>Name : </strong> '.$_POST['name'].'</p>
                    <p><strong>E-mail : </strong> '.$_POST['email'].'</p>
                    <p><strong>Phone : </strong> '.$_POST['phone'].'</p>
                    <p><strong>Message : </strong> '.$_POST['message'].'</p>
                </body>
            </html>
        ';

$mail->Body = $body;
//Отправляем
$mail->send();

?>