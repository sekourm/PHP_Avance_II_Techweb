<?php

namespace AppBundle\Controller;

use AppBundle\Entity\techUsers;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends Controller
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

        $response = new Response($serializer->serialize(array('message' => 'Inscription réussit', 'inscription' => 'true'), 'json'));
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
}




