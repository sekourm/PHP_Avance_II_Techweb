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
use Symfony\Component\PropertyAccess\PropertyAccess;


class CategoriesController extends Controller
{
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

        $repository = $this->getDoctrine()->getRepository('AppBundle:techProjects');
        $check = $repository->findBy(array('id' => $post->projectId));
        $accessor = PropertyAccess::createPropertyAccessor();
        $test = $check[0]->getUsersByProjects()->getValues();
        $TabEmail = [];

        for($i = 0; $i< count($test); $i++){
            $TabEmail[] = $accessor->getValue($test[$i]->getUsersByProjects()->getProjectsByUsers()->getValues()[0]->getUsersByProjects(),'email');
        };


        for($k = 0; $k <count($TabEmail); $k++){

            $message = \Swift_Message::newInstance()
                ->setSubject("Une Catégorie a été crée")
                ->setFrom('techWeb@confirmation.fr')
                ->setTo($TabEmail[$k])
                ->setBody($this->renderView('Categories/categories.html.twig', array('username' => 'sa marche')), 'text/html');
            $this->get('mailer')->send($message);
        }


        $response = new Response($serializer->serialize(array('message' => 'Création de catégorie réussit', 'creation' => 'true'), 'json'));
        return $response;
    }

    public function checkCategorieAction($projectId,$name){
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $em = $this->getDoctrine()->getManager();
        $repository = $this->getDoctrine()->getRepository('AppBundle:techProjects');
        $check = $repository->findBy(array('id' => $projectId));
        $accessor = PropertyAccess::createPropertyAccessor();
        $test = $check[0]->getUsersByProjects()->getValues();
        $TabEmail = [];
        for($i = 0; $i< count($test); $i++){
            $TabEmail[] = $accessor->getValue($test[$i]->getUsersByProjects()->getProjectsByUsers()->getValues()[0]->getUsersByProjects(),'email');
        };


        for($k = 0; $k <count($TabEmail); $k++){

            $message = \Swift_Message::newInstance()
                ->setSubject("Une Catégorie a été crée")
                ->setFrom('techWeb@confirmation.fr')
                ->setTo($TabEmail[$k])
                ->setBody($this->renderView('Categories/categories.html.twig', array('username' => 'sa marche')), 'text/html');
            $this->get('mailer')->send($message);


            dump($TabEmail[$k]);
        }
        $response = new Response($serializer->serialize(array('message' => 'Création de catégorie réussit', 'creation' => 'true'), 'json'));
        return $response;
    }

}