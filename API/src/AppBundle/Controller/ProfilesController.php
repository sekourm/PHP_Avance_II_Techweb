<?php

namespace AppBundle\Controller;

use AppBundle\Entity\techUsers;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\HttpFoundation\Response;

class ProfilesController extends Controller
{
    public function addProfilesAction()
    {
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);

        $directoryPath = $this->container->getParameter('kernel.root_dir') . '/../web/Picture/';
        $path = $directoryPath . 'mercedes.jpg';
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $profiles = new techUsers();

        $privateKey = md5(microtime() . rand());

        $post = $this->getRequest()->getContent();
        $post = json_decode($post);

        $username = $post->username;
        $password = $post->password;
        $email = $post->email;

        if (!isset($post->photo))
        {
            $photo = 'data:image/' . $type . ';base64,' . base64_encode($data);

        }
        else
        {
            $photo = $post->photo;
        }

        $em = $this->getDoctrine()->getManager();
        $emailProfiles = $em->getRepository('AppBundle:techUsers')->findOneBy(array('email' => $email));

        if ($emailProfiles) {
            $response = new Response($serializer->serialize(array('message' => 'Cette Adresse est déjà utilisé', 'inscription' => 'false'), 'json'));
            return $response;
        }

        $profiles->setUsername($username);
        $profiles->setPassword(md5($password));
        $profiles->setPersonalKey($privateKey);
        $profiles->setEmail($email);
        $profiles->setPicture($photo);
        $em = $this->getDoctrine()->getManager();
        $em->persist($profiles);
        $em->flush();
        $user_id = $profiles->getId();

        $message = \Swift_Message::newInstance()
            ->setSubject("Confirmation d'inscription Instant View")
            ->setFrom('InstantView@confirmation.fr')
            ->setTo($email)
            ->setBody($this->renderView('Emails/registration.html.twig', array('username' => $username, 'user_id' => $user_id, 'private_key' => $privateKey)), 'text/html');
        $this->get('mailer')->send($message);


        $response = new Response($serializer->serialize(array('message' => 'Inscription réussit Un mail vient de vous être envoyer', 'inscription' => 'true'), 'json'));
        return $response;
    }

    public function authentificationProfilesAction()
    {
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);

        $post = $this->getRequest()->getContent();
        $post = json_decode($post);
        $password = $post->password;
        $email = $post->email;

        $em = $this->getDoctrine()->getManager();
        $profile = $em->getRepository('AppBundle:techUsers')->findOneBy(array('email' => $email, 'password' => md5($password)));

        if (!$profile) {
            $response = new Response($serializer->serialize(array('message' => 'Identifiant ou mot de passe incorrect', 'connexion' => 'false'), 'json'));
            return $response;
        }

        if($profile->getActive() == 0)
        {
            $response = new Response($serializer->serialize(array('message' => 'Activer votre compte', 'connexion' => 'false'), 'json'));
            return $response;
        }

        $Id = $profile->getId();
        $response = new Response($serializer->serialize(array('message' => 'Connexion réussit', 'connexion' => 'true' , 'Id' => $Id), 'json'));
        return $response;
    }

    public function VerifyAccountAction($userId,$privateKey)
    {
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);

        /*$post = $this->getRequest()->getContent();
        $post = json_decode($post);
        dump($post);die();
        $userId = $post->userId;

        $privateKey = $post->privateKey;*/

        $em = $this->getDoctrine()->getManager();
        $repository = $this->getDoctrine()->getRepository('AppBundle:techUsers');
        $profile = $repository->findBy(array('id' => $userId, 'personalKey' => $privateKey));

        $valide = count($profile);
        if ($valide >= 1) {
            if ($profile[0]->getActive() == 'true') {
                $response = new Response($serializer->serialize(array('message' => 'compte deja activer', 'activation' => 'false'), 'json'));
                return $response;
            }
            else{

                $product = $em->getRepository('AppBundle:techUsers')->find($userId);
                $product->setActive('1');
                $em->flush();

                $response = new Response($serializer->serialize(array('message' => 'compte activer avec success', 'activation' => 'true'), 'json'));
                return $response;
            }
        }

        $response = new Response($serializer->serialize(array('message' => 'compte Inexistant', 'activation' => 'false'), 'json'));
        return $response;
    }

    public function searchUserAction()
    {
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $serializer = $this->container->get('serializer');
        $em = $this->getDoctrine()->getManager();

        $post = $this->getRequest()->getContent();
        $post = json_decode($post);

        $techUser = $em->getRepository('AppBundle:techUsers')
            ->createQueryBuilder('u')
            ->where('u.username LIKE :username','u.active = 1')
            ->setParameter('username', $post->username.'%')
            ->setMaxResults(5)
            ->getQuery()->getArrayResult();

       // $techUser = $serializer->serialize($techUser, 'json');

        $response = new Response($serializer->serialize(array('message' => 'bien recu', 'search' => 'true','techUser' =>$techUser), 'json'));
        return $response;

    }
}