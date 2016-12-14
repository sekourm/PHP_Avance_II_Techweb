<?php

namespace AppBundle\Controller;

use AppBundle\Entity\techProjects;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\techCategories;
use AppBundle\Entity\techTasks;

class ProjectsController extends Controller
{
    public function addProjectAction()
    {
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $post = $this->getRequest()->getContent();
        $em = $this->getDoctrine()->getManager();
        $post = json_decode($post);
        $projects = new techProjects();
        $projects->setName($post->name);
        $projects->setProjectsUsers($em->getReference('AppBundle\Entity\techUsers', $post->userId));
        $em->persist($projects);
        $em->flush();
        $response = new Response($serializer->serialize(array('message' => 'Création de projet réussit', 'creation' => 'true'), 'json'));
        return $response;

    }

    public function showProjectAction()
    {
        $post = $this->getRequest()->getContent();
        $em = $this->getDoctrine()->getManager();
        $post = json_decode($post);
        $serializer = $this->container->get('serializer');
        $projects = $em->getRepository('AppBundle:techUsers')->findBy(array('id' => $post->userId));
        //dump($projects);
        if(!$projects)
        {
            $response = new Response($serializer->serialize(array('message'=>'Aucun Projet pour le moment', 'projet' => 'false'), 'json'));
            return $response;
        }
        $reports = $serializer->serialize($projects, 'json');

        return new Response($reports);
    }

    public function createCategorieAction()
    {
        $categories = new techCategories();

        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);

        $post = $this->getRequest()->getContent();
        $post = json_decode($post);

        $em = $this->getDoctrine()->getManager();

        $categories->setName($post->nameCategorie);
        $categories->setProjectsByCategories($em->getReference('AppBundle\Entity\techProjects', $post->projectId));
        $em->persist($categories);
        $em->flush();

        $response = new Response($serializer->serialize(array('message' => 'Création de catégorie réussit', 'creation' => 'true'), 'json'));
        return $response;
    }

}